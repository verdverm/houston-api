import { sendEmail } from "./index";
import casual from "casual";

describe("sendEmail", () => {
  test("correctly send an email", async () => {
    await expect(
      sendEmail(casual.email, "alert", {
        alert: {
          labels: { deployment: casual.word }
        }
      })
    ).resolves.toBeTruthy();
  });
});
