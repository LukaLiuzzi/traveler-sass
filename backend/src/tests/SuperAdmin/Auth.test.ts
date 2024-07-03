import request from "supertest"
import { Server } from "../../index"
import { API_URL } from "@config/constants"

describe("SuperAdmin Auth", () => {
  let server: Server

  beforeAll(async () => {
    server = new Server(8080)
    server.start()
  })

  it("should create a new owner", async () => {
    const response = await request(server.app)
      .post(`${API_URL}/super-admin/auth/register`)
      .send({
        email: "",
      })

    expect(response.status).toBe(200)
  })
})
