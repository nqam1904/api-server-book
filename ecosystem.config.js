module.exports = {
  "apps": [
    {
      "name": "my-app",
      "script": "../src/main.ts",
      "interpreter_args": "--require /path/to/.pnp.js",
      "exec_mode": "cluster"
     }
  ]
}