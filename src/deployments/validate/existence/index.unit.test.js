import validateExistence from "./index";
import { DuplicateDeploymentLabelError } from "errors";
import * as exports from "generated/client";
import casual from "casual";

describe("validateExistence", () => {
  test("throws correct error if exists", async () => {
    const workspaceId = casual.uuid;
    const label = casual.word;

    const deployments = function() {
      return {
        id: () => casual.uuid
      };
    };

    // Set up our spy.
    jest.spyOn(exports.prisma, "deployments").mockImplementation(deployments);

    // Call the function.
    await expect(validateExistence(workspaceId, label)).rejects.toThrow(
      new DuplicateDeploymentLabelError(label)
    );
  });
});
