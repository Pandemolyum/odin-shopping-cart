import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../src/App.tsx";
import routes from "../src/routes.tsx";
import { createMemoryRouter, RouterProvider } from "react-router";
import userEvent from "@testing-library/user-event";

function renderApp(initialRoute = "/") {
    return render(
        <RouterProvider
            router={createMemoryRouter(routes, {
                initialEntries: [initialRoute],
            })}
        />,
    );
}

const mockData = [
    { id: 0, name: "apple", price: 1, quantity: 0, imgUrl: null },
    { id: 1, name: "banana", price: 2, quantity: 0, imgUrl: null },
    { id: 2, name: "carrot", price: 3, quantity: 0, imgUrl: null },
];

describe("App component", () => {
    it("renders homepage", () => {
        const { container } = renderApp();
        expect(container).toMatchSnapshot();
    });

    // Test is somewhat fragile due to testing the first links in the page and not targeting header directly
    it("renders header links correctly", () => {
        renderApp();

        const links = screen.getAllByRole("link");
        const linksText = links.map((link) => link.textContent);

        expect(linksText[0]).toMatch(/home/i);
        expect(linksText[1]).toMatch(/shop/i);
        expect(linksText[2]).toMatch(/cart/i);
    });

    it("renders buttons", async () => {
        globalThis.fetch = vi.fn();
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockData,
        });

        renderApp("/shop");

        const cartButtons = await screen.findAllByRole("button", {
            name: "Add To Cart",
        });
        const incrButtons = await screen.findAllByRole("button", {
            name: "+",
        });
        const decrButtons = await screen.findAllByRole("button", {
            name: "-",
        });

        expect(cartButtons.length).toBe(3);
        expect(incrButtons.length).toBe(3);
        expect(decrButtons.length).toBe(3);
    });

    it("renders correct number of cart items after adding to cart", async () => {
        const user = userEvent.setup();

        globalThis.fetch = vi.fn();
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockData,
        });

        renderApp("/shop");

        const cartButtons = await screen.findAllByRole("button", {
            name: "Add To Cart",
        });
        const cartButton = cartButtons[0]; // Need to call this separately after Promise is returned. Otherwise the value will be undefined
        const incrButtons = await screen.findAllByRole("button", {
            name: "+",
        });
        const incrButton = incrButtons[0]; // Same as above

        await user.click(incrButton);
        await user.click(cartButton);

        const cartText = await screen.findByRole("link", { name: "Cart (1)" });
        expect(cartText).toBeInTheDocument();
    });

    it("renders cart items in cart page", async () => {
        const user = userEvent.setup();

        globalThis.fetch = vi.fn();
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockData,
        });

        renderApp("/shop");

        const cartButtons = await screen.findAllByRole("button", {
            name: "Add To Cart",
        });
        const cartButton = cartButtons[0]; // Need to call this separately after Promise is returned. Otherwise the value will be undefined
        const incrButtons = await screen.findAllByRole("button", {
            name: "+",
        });
        const incrButton = incrButtons[0]; // Same as above

        await user.click(incrButton);
        await user.click(cartButton);

        const links = screen.getAllByRole("link");
        await user.click(links[2]);

        const cartPageButton = await screen.findByRole("button", {
            name: "Remove From Cart",
        });

        expect(cartPageButton).toBeInTheDocument();
    });

    it("removes cart items in cart page", async () => {
        const user = userEvent.setup();

        globalThis.fetch = vi.fn();
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockData,
        });

        renderApp("/shop");

        const cartShopButtons = await screen.findAllByRole("button", {
            name: "Add To Cart",
        });
        const cartShopButton = cartShopButtons[0]; // Need to call this separately after Promise is returned. Otherwise the value will be undefined
        const incrButtons = await screen.findAllByRole("button", {
            name: "+",
        });
        const incrButton = incrButtons[0]; // Same as above

        await user.click(incrButton);
        await user.click(cartShopButton);

        const links = screen.getAllByRole("link");
        await user.click(links[2]);

        const cartPageButton = await screen.findByRole("button", {
            name: "Remove From Cart",
        });

        await user.click(cartPageButton);

        expect(cartPageButton).not.toBeInTheDocument();
    });
});
