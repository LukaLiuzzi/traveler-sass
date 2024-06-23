import express, { Application, Request, Response } from "express"

class Server {
  private app: Application
  private port: number

  constructor(port: number) {
    this.app = express()
    this.port = port
    this.configureMiddlewares()
    this.configureRoutes()
  }

  private configureMiddlewares(): void {
    this.app.use(express.json())
  }

  private configureRoutes(): void {
    this.app.get("/", (req: Request, res: Response) => {
      res.send("Hello, world!")
    })
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`)
    })
  }
}

const server = new Server(8080)
server.start()
