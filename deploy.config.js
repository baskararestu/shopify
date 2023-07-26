module.exports = {
  apps: [
    {
      name: "JCWDOL0910", // Format JCWD-{batchcode}-{groupnumber}
      script: "./projects/server/src/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 0910,
      },
      time: true,
    },
  ],
};
