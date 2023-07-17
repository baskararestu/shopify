import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { fetchOrderPaymentList } from "../../features/orders/orderListAdminSlice";
import CustomToast from "../CustomToast/CustomToast";
import { toast } from "react-toastify";

function SendOrderModal({ selectedId }) {
  const dispatch = useDispatch();
  const sendButton = async () => {
    try {
      let response = await axios.post(
        `http://localhost:8000/api/admins/orders/send?id_order=${selectedId}`
      );
      toast(
        <CustomToast type="success" message={response.data.message} />
        // CustomToastOptions
      );
      // dispatch(fetchOrderPaymentList());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <dialog id="send_order" className="modal">
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">Send Order Confirmation</h3>
        <p>
          Prior to sending your order, please ensure that the stock is already
          physically available in the warehouse.
        </p>
        <p>Are you sure you want to send this order: #{selectedId}</p>
        <div className="modal-action">
          <button className="btn btn-error" onClick={sendButton}>
            Yes
          </button>
          <button className="btn btn-info">No</button>
        </div>
      </form>
    </dialog>
  );
}

export default SendOrderModal;
