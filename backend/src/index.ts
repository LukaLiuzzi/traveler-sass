import express, { Application } from "express"
import cors from "cors"
import { AuthRoutes } from "@routes/authRoutes"
import { connectToMongoDB } from "@config/mongo"
import { EmployeesRoutes } from "@routes/employeesRoutes"

class Server {
  public app: Application
  private port: number

  constructor(port: number) {
    this.app = express()
    this.port = port
    this.configureMiddlewares()
    this.configureRoutes()
  }

  private configureMiddlewares(): void {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cors())
  }

  private configureRoutes(): void {
    this.app.use("/api/v1/auth", AuthRoutes.init())
    this.app.use("/api/v1/employees", EmployeesRoutes.init())
  }

  public async start(): Promise<void> {
    await connectToMongoDB()
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`)
    })
  }
}

const server = new Server(8080)
server.start()

export { Server }
