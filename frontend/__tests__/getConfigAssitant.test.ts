import { getAssistantConfig } from "../config/vapi";

describe("getConfigAssistant", () => {  const companion = {
    name: "Math Tutor",
    topic: "Algebra",
    subject: "Mathematics",
    speakingStyle: "Friendly",
  };

  const user = {
    name: "John Doe",
  };


   test("returns the correct name when companion name exists", () => {
      const result  = getAssistantConfig(companion, user);

      expect(result.name).toBe("Math Tutor");
   })

   it("should fallback to dfault when companion name is missing", () => {
      const result  = getAssistantConfig({ ...companion, name: "" }, user);

      expect(result.name).toBe("AI Tutor");
   })



   test("should extract first name from user", () => {
      const result  = getAssistantConfig(companion, user);

      expect(result.firstMessage).toContain("John");
   })



test("should handle undefined user safely", () => {
      const result  = getAssistantConfig(companion, user);

      expect(result.firstMessage).toContain("Hello");
   })

test("should include topic can subject in system message", () => {
      const result  = getAssistantConfig(companion, user);
      const message = result.model.messages[0].content
      expect(message).toContain("Algebra");
      expect(message).toContain("Mathematics");

   })

test("should fallback to defualt speaking style", () => {
      const result  = getAssistantConfig({ ...companion, speakingStyle: undefined }, user);
 const message = result.model.messages[0].content
      expect(message).toContain("Friendly");
   })


});