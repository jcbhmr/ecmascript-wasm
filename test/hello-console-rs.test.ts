import { $ } from "execa"

await $({ cwd: "go-hello-console" })`cargo test`
