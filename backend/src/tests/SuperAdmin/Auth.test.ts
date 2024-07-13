// import request from "supertest"
// import { Server } from "../../index"
// import { API_VERSION } from "../../config/constants"
// import { type Owner } from "@interfaces/user"

// describe("SuperAdmin Auth", () => {
//   let server: Server

//   beforeAll(async () => {
//     server = new Server(8081)
//     server.start()
//   })

//   it("should create a new owner", async () => {
//     const user: Partial<Owner> = {
//       email: "luka@luka.com",
//       password: "123456",
//       name: "Luka",
//       last_name: "Modric",
//       role: "owner",
//       status: "active",
//     }
//     const response = await request(server.app)
//       .post(`/api/v${API_VERSION}/super-admin/auth/register`)
//       .send(user)

//     expect(response.status).toBe(200)
//   })
// })
