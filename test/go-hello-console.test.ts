import { $ } from "execa"

await $({ cwd: "go-hello-console" })`go test`
