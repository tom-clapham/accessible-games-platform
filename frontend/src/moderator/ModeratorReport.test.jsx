import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import ModeratorReports from "./ModeratorReports";

vi.mock("axios");

const mockReports = [
    // Pending report
  {
    id: 1,
    report_type: "Inappropriate content",
    gameId: 101,
    postId: null,
    description: "Test description",
    created_at: "2024-11-01T10:00:00Z",
    reviewed_at: null,
    reviewed_by: null,
    review_reason: null,
    userId: 5
  },
  // Reviewed report
  {
    id: 2,
    report_type: "Spam",
    gameId: null,
    postId: 202,
    description: "Spam post",
    created_at: "2024-11-02T12:00:00Z",
    reviewed_at: "2024-11-03T14:00:00Z",
    reviewed_by: 1,
    review_reason: "Deleted",
    userId: 6
  }
];

describe("ModeratorReports Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    axios.get.mockResolvedValue({ data: mockReports });
  });

  test("renders reports table with correct data", async () => {
    render(<MemoryRouter><ModeratorReports /></MemoryRouter>);


    // Check for various elements on the page
    expect(await screen.findByText("User Reports")).toBeInTheDocument();
    expect(await screen.findByText("Inappropriate content")).toBeInTheDocument();
    expect(await screen.findByText("Spam")).toBeInTheDocument();
    expect(await screen.findAllByText("View Description")).toHaveLength(2);
  });

  test("opens description dialog when button clicked", async () => {
    render(<MemoryRouter><ModeratorReports /></MemoryRouter>);
    
    const buttons = await screen.findAllByText("View Description");
    await userEvent.click(buttons[0]);

    expect(await screen.findByText("Test description")).toBeInTheDocument();
  });

  test("opens review dialog for reviewed report", async () => {
    render(<MemoryRouter><ModeratorReports /></MemoryRouter>);
    
    const reviewButton = await screen.findByText("View Review");
    await userEvent.click(reviewButton);

    expect(await screen.findByText(/Reviewed by:/)).toBeInTheDocument();
    expect(await screen.findByText(/Review Notes:/)).toBeInTheDocument();
  });

  test("moderator action buttons exist for pending reports", async () => {
    render(<MemoryRouter><ModeratorReports /></MemoryRouter>);

    const ignoreButton = await screen.findByText("Ignore");
    const deleteButton = await screen.findByText("Delete");

    expect(ignoreButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });

  test("clicking ignore opens ignore dialog", async () => {
    render(<MemoryRouter><ModeratorReports /></MemoryRouter>);

    const ignoreButton = await screen.findByText("Ignore");
    await userEvent.click(ignoreButton);

    expect(await screen.findByText("Ignore Report")).toBeInTheDocument();
  });

  test("clicking delete opens delete dialog", async () => {
    render(<MemoryRouter><ModeratorReports /></MemoryRouter>);

    const deleteButton = await screen.findByText("Delete");
    await userEvent.click(deleteButton);


    // Check for the warning message since 'Delete Content' appears twice and throws an error
    // Works as the mocked unreviewed report is a game instead of a post
    expect(await screen.findByText("Warning: Deleting a \"Game\" will also remove all associated posts and reports.")).toBeInTheDocument();
  });
});
