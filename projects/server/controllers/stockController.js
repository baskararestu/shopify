const { db, query } = require("../database");
const { parseTotalStock } = require("../helper/productHelper");
const stockQueries = require("../queries/stockQueries");

module.exports = {
  fetchStocks: async (req, res) => {
    try {
      let { page, search, sort } = req.query;
      const itemsPerPage = 10;

      page = parseInt(page);
      if (isNaN(page) || page < 1) {
        page = 1;
      }

      const offset = (page - 1) * itemsPerPage;

      const stocksQuery = stockQueries.fetchStocksQuery(
        search,
        sort,
        offset,
        itemsPerPage
      );
      const countQuery = stockQueries.countStocksQuery(search);

      const [stocks, countResult] = await Promise.all([
        query(stocksQuery),
        query(countQuery),
      ]);

      const totalItems = countResult[0].total;
      const totalPages = Math.ceil(totalItems / itemsPerPage);

      parseTotalStock(stocks);
      console.log(stocks);

      return res.status(200).send({ stocks, totalPages, itemsPerPage });
    } catch (error) {
      return res.status(error.statusCode || 500).send(error);
    }
  },
  updateStock: async (req, res) => {
    try {
      const { id_stock, quantity, status } = req.body;

      const selectStockQuery = stockQueries.selectStockQuery(id_stock);
      const [currentStock] = await query(selectStockQuery);
      const { total_stock } = currentStock;

      let newStock;
      if (status === "incoming") {
        newStock = total_stock + quantity;
      } else if (status === "outgoing") {
        newStock = total_stock - quantity;

        if (newStock < 0) {
          return res
            .status(400)
            .send({ message: "Stock quantity cannot be lower than 0" });
        }
      } else {
        return res.status(400).send({ message: "Invalid status provided" });
      }

      const updateStock = stockQueries.updateStockQuery(id_stock, newStock);
      await query(updateStock);

      const insertHistory = stockQueries.insertHistoryQuery(
        id_stock,
        status,
        quantity
      );
      await query(insertHistory);

      return res.status(200).send({ message: "Stock updated successfully" });
    } catch (error) {
      return res.status(error.statusCode || 500).send(error);
    }
  },

  addStock: async (req, res) => {
    try {
      const { id_product, id_warehouse, quantity } = req.body;
      const status = "incoming";
      const checkStock = stockQueries.checkStockQuery(id_product, id_warehouse);
      const [existingStock] = await query(checkStock);

      if (existingStock) {
        return res
          .status(409)
          .send({ message: "Stock already exists in the specified warehouse" });
      } else {
        const insertStock = stockQueries.insertStockQuery(
          id_product,
          id_warehouse,
          quantity
        );
        const result = await query(insertStock);

        const id_stock = result.insertId;

        const insertHistory = stockQueries.insertHistoryQuery(
          id_stock,
          status,
          quantity
        );
        await query(insertHistory);

        return res.status(200).send({ message: "Stock added successfully" });
      }
    } catch (error) {
      return res.status(error.statusCode || 500).send(error);
    }
  },
  deleteStock: async (req, res) => {
    try {
      const { id_stock } = req.query;
      const checkStock = stockQueries.checkStockQuery(id_stock);
      const [existingStock] = await query(checkStock);

      if (!existingStock) {
        return res
          .status(404)
          .send({ message: "Stock not found with the provided ID" });
      } else {
        const deleteStock = stockQueries.deleteStockQuery(id_stock);
        await query(deleteStock);

        const deleteHistory = stockQueries.deleteHistoryQuery(id_stock);
        await query(deleteHistory);

        return res.status(200).send({ message: "Stock deleted successfully" });
      }
    } catch (error) {
      return res.status(error.statusCode || 500).send(error);
    }
  },
};
