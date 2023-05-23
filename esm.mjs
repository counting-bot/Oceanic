// Channel and Interaction MUST be at the top due to circular imports
const Client = (await import("./dist/lib/Client.js")).default;
const Permission = (await import("./dist/lib/structures/Permission.js")).default;

export {
    Client,
    Permission
};
