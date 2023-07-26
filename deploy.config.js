module.exports = {
  apps: [
    {
      name: "JCWDOL0910", // Format JCWD-{batchcode}-{groupnumber}
      script: "./projects/server/src/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 8910,
      },
      time: true,
    },
  ],
};
