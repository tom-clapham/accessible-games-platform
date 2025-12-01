import { vi } from "vitest";
import axios from "axios";

export function mockDashboardRequests() {
  vi.mock("axios");

  axios.get = vi.fn().mockResolvedValue({ data: [] });

  // Mock user_info() and get a moderator user
  vi.mock("../endpoints/api.js", () => ({
    user_info: vi.fn().mockResolvedValue({ is_moderator: true }),
  }));
}