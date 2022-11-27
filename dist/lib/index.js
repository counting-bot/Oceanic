"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StageChannel = exports.ShardManager = exports.Shard = exports.SequentialBucket = exports.SelectMenuValuesWrapper = exports.Routes = exports.Role = exports.RESTManager = exports.PublicThreadChannel = exports.PrivateThreadChannel = exports.PrivateChannel = exports.PingInteraction = exports.PermissionOverwrite = exports.Permission = exports.PartialApplication = exports.OAuthHelper = exports.OAuthGuild = exports.OAuth = exports.ModalSubmitInteraction = exports.Message = exports.Member = exports.Invite = exports.InteractionOptionsWrapper = exports.InteractionResolvedChannel = exports.Integration = exports.GuildChannel = exports.Guild = exports.GroupChannel = exports.GatewayError = exports.ForumChannel = exports.ExtendedUser = exports.DiscordRESTError = exports.DiscordHTTPError = exports.ComponentInteraction = exports.Collection = exports.CommandInteraction = exports.Constants = exports.ClientApplication = exports.Client = exports.CategoryChannel = exports.Bucket = exports.Base = exports.AutocompleteInteraction = exports.Attachment = exports.ApplicationCommand = exports.Application = exports.AnnouncementThreadChannel = exports.AnnouncementChannel = exports.Interaction = exports.Channel = void 0;
exports.Webhook = exports.VoiceChannel = exports.Util = exports.User = exports.UncaughtError = exports.UnavailableGuild = exports.TypedEmitter = exports.TypedCollection = exports.ThreadChannel = exports.TextChannel = exports.TextableChannel = exports.Team = exports.StageInstance = void 0;
const tslib_1 = require("tslib");
// Channel and Interaction MUST be at the top due to circular imports
var Channel_1 = require("./structures/Channel");
Object.defineProperty(exports, "Channel", { enumerable: true, get: function () { return tslib_1.__importDefault(Channel_1).default; } });
var Interaction_1 = require("./structures/Interaction");
Object.defineProperty(exports, "Interaction", { enumerable: true, get: function () { return tslib_1.__importDefault(Interaction_1).default; } });
var AnnouncementChannel_1 = require("./structures/AnnouncementChannel");
Object.defineProperty(exports, "AnnouncementChannel", { enumerable: true, get: function () { return tslib_1.__importDefault(AnnouncementChannel_1).default; } });
var AnnouncementThreadChannel_1 = require("./structures/AnnouncementThreadChannel");
Object.defineProperty(exports, "AnnouncementThreadChannel", { enumerable: true, get: function () { return tslib_1.__importDefault(AnnouncementThreadChannel_1).default; } });
var Application_1 = require("./structures/Application");
Object.defineProperty(exports, "Application", { enumerable: true, get: function () { return tslib_1.__importDefault(Application_1).default; } });
var ApplicationCommand_1 = require("./structures/ApplicationCommand");
Object.defineProperty(exports, "ApplicationCommand", { enumerable: true, get: function () { return tslib_1.__importDefault(ApplicationCommand_1).default; } });
var Attachment_1 = require("./structures/Attachment");
Object.defineProperty(exports, "Attachment", { enumerable: true, get: function () { return tslib_1.__importDefault(Attachment_1).default; } });
var AutocompleteInteraction_1 = require("./structures/AutocompleteInteraction");
Object.defineProperty(exports, "AutocompleteInteraction", { enumerable: true, get: function () { return tslib_1.__importDefault(AutocompleteInteraction_1).default; } });
var Base_1 = require("./structures/Base");
Object.defineProperty(exports, "Base", { enumerable: true, get: function () { return tslib_1.__importDefault(Base_1).default; } });
var Bucket_1 = require("./rest/Bucket");
Object.defineProperty(exports, "Bucket", { enumerable: true, get: function () { return tslib_1.__importDefault(Bucket_1).default; } });
var CategoryChannel_1 = require("./structures/CategoryChannel");
Object.defineProperty(exports, "CategoryChannel", { enumerable: true, get: function () { return tslib_1.__importDefault(CategoryChannel_1).default; } });
var Client_1 = require("./Client");
Object.defineProperty(exports, "Client", { enumerable: true, get: function () { return tslib_1.__importDefault(Client_1).default; } });
var ClientApplication_1 = require("./structures/ClientApplication");
Object.defineProperty(exports, "ClientApplication", { enumerable: true, get: function () { return tslib_1.__importDefault(ClientApplication_1).default; } });
tslib_1.__exportStar(require("./Constants"), exports);
exports.Constants = tslib_1.__importStar(require("./Constants"));
var CommandInteraction_1 = require("./structures/CommandInteraction");
Object.defineProperty(exports, "CommandInteraction", { enumerable: true, get: function () { return tslib_1.__importDefault(CommandInteraction_1).default; } });
var Collection_1 = require("./util/Collection");
Object.defineProperty(exports, "Collection", { enumerable: true, get: function () { return tslib_1.__importDefault(Collection_1).default; } });
var ComponentInteraction_1 = require("./structures/ComponentInteraction");
Object.defineProperty(exports, "ComponentInteraction", { enumerable: true, get: function () { return tslib_1.__importDefault(ComponentInteraction_1).default; } });
var DiscordHTTPError_1 = require("./rest/DiscordHTTPError");
Object.defineProperty(exports, "DiscordHTTPError", { enumerable: true, get: function () { return tslib_1.__importDefault(DiscordHTTPError_1).default; } });
var DiscordRESTError_1 = require("./rest/DiscordRESTError");
Object.defineProperty(exports, "DiscordRESTError", { enumerable: true, get: function () { return tslib_1.__importDefault(DiscordRESTError_1).default; } });
var ExtendedUser_1 = require("./structures/ExtendedUser");
Object.defineProperty(exports, "ExtendedUser", { enumerable: true, get: function () { return tslib_1.__importDefault(ExtendedUser_1).default; } });
var ForumChannel_1 = require("./structures/ForumChannel");
Object.defineProperty(exports, "ForumChannel", { enumerable: true, get: function () { return tslib_1.__importDefault(ForumChannel_1).default; } });
var GatewayError_1 = require("./gateway/GatewayError");
Object.defineProperty(exports, "GatewayError", { enumerable: true, get: function () { return tslib_1.__importDefault(GatewayError_1).default; } });
var GroupChannel_1 = require("./structures/GroupChannel");
Object.defineProperty(exports, "GroupChannel", { enumerable: true, get: function () { return tslib_1.__importDefault(GroupChannel_1).default; } });
var Guild_1 = require("./structures/Guild");
Object.defineProperty(exports, "Guild", { enumerable: true, get: function () { return tslib_1.__importDefault(Guild_1).default; } });
var GuildChannel_1 = require("./structures/GuildChannel");
Object.defineProperty(exports, "GuildChannel", { enumerable: true, get: function () { return tslib_1.__importDefault(GuildChannel_1).default; } });
var Integration_1 = require("./structures/Integration");
Object.defineProperty(exports, "Integration", { enumerable: true, get: function () { return tslib_1.__importDefault(Integration_1).default; } });
var InteractionResolvedChannel_1 = require("./structures/InteractionResolvedChannel");
Object.defineProperty(exports, "InteractionResolvedChannel", { enumerable: true, get: function () { return tslib_1.__importDefault(InteractionResolvedChannel_1).default; } });
var InteractionOptionsWrapper_1 = require("./util/InteractionOptionsWrapper");
Object.defineProperty(exports, "InteractionOptionsWrapper", { enumerable: true, get: function () { return tslib_1.__importDefault(InteractionOptionsWrapper_1).default; } });
var Invite_1 = require("./structures/Invite");
Object.defineProperty(exports, "Invite", { enumerable: true, get: function () { return tslib_1.__importDefault(Invite_1).default; } });
var Member_1 = require("./structures/Member");
Object.defineProperty(exports, "Member", { enumerable: true, get: function () { return tslib_1.__importDefault(Member_1).default; } });
var Message_1 = require("./structures/Message");
Object.defineProperty(exports, "Message", { enumerable: true, get: function () { return tslib_1.__importDefault(Message_1).default; } });
var ModalSubmitInteraction_1 = require("./structures/ModalSubmitInteraction");
Object.defineProperty(exports, "ModalSubmitInteraction", { enumerable: true, get: function () { return tslib_1.__importDefault(ModalSubmitInteraction_1).default; } });
/** @depecated Use {@link OAuthHelper#constructURL} for the `constructURL` function. {@link OAuth#constructURL}, along with this export will be removed in `1.5.0`. */
var OAuth_1 = require("./routes/OAuth");
Object.defineProperty(exports, "OAuth", { enumerable: true, get: function () { return tslib_1.__importDefault(OAuth_1).default; } });
var OAuthGuild_1 = require("./structures/OAuthGuild");
Object.defineProperty(exports, "OAuthGuild", { enumerable: true, get: function () { return tslib_1.__importDefault(OAuthGuild_1).default; } });
var OAuthHelper_1 = require("./rest/OAuthHelper");
Object.defineProperty(exports, "OAuthHelper", { enumerable: true, get: function () { return tslib_1.__importDefault(OAuthHelper_1).default; } });
var PartialApplication_1 = require("./structures/PartialApplication");
Object.defineProperty(exports, "PartialApplication", { enumerable: true, get: function () { return tslib_1.__importDefault(PartialApplication_1).default; } });
var Permission_1 = require("./structures/Permission");
Object.defineProperty(exports, "Permission", { enumerable: true, get: function () { return tslib_1.__importDefault(Permission_1).default; } });
var PermissionOverwrite_1 = require("./structures/PermissionOverwrite");
Object.defineProperty(exports, "PermissionOverwrite", { enumerable: true, get: function () { return tslib_1.__importDefault(PermissionOverwrite_1).default; } });
var PingInteraction_1 = require("./structures/PingInteraction");
Object.defineProperty(exports, "PingInteraction", { enumerable: true, get: function () { return tslib_1.__importDefault(PingInteraction_1).default; } });
var PrivateChannel_1 = require("./structures/PrivateChannel");
Object.defineProperty(exports, "PrivateChannel", { enumerable: true, get: function () { return tslib_1.__importDefault(PrivateChannel_1).default; } });
var PrivateThreadChannel_1 = require("./structures/PrivateThreadChannel");
Object.defineProperty(exports, "PrivateThreadChannel", { enumerable: true, get: function () { return tslib_1.__importDefault(PrivateThreadChannel_1).default; } });
var PublicThreadChannel_1 = require("./structures/PublicThreadChannel");
Object.defineProperty(exports, "PublicThreadChannel", { enumerable: true, get: function () { return tslib_1.__importDefault(PublicThreadChannel_1).default; } });
var RESTManager_1 = require("./rest/RESTManager");
Object.defineProperty(exports, "RESTManager", { enumerable: true, get: function () { return tslib_1.__importDefault(RESTManager_1).default; } });
var Role_1 = require("./structures/Role");
Object.defineProperty(exports, "Role", { enumerable: true, get: function () { return tslib_1.__importDefault(Role_1).default; } });
exports.Routes = tslib_1.__importStar(require("./util/Routes"));
var SelectMenuValuesWrapper_1 = require("./util/SelectMenuValuesWrapper");
Object.defineProperty(exports, "SelectMenuValuesWrapper", { enumerable: true, get: function () { return tslib_1.__importDefault(SelectMenuValuesWrapper_1).default; } });
var SequentialBucket_1 = require("./rest/SequentialBucket");
Object.defineProperty(exports, "SequentialBucket", { enumerable: true, get: function () { return tslib_1.__importDefault(SequentialBucket_1).default; } });
var Shard_1 = require("./gateway/Shard");
Object.defineProperty(exports, "Shard", { enumerable: true, get: function () { return tslib_1.__importDefault(Shard_1).default; } });
var ShardManager_1 = require("./gateway/ShardManager");
Object.defineProperty(exports, "ShardManager", { enumerable: true, get: function () { return tslib_1.__importDefault(ShardManager_1).default; } });
var StageChannel_1 = require("./structures/StageChannel");
Object.defineProperty(exports, "StageChannel", { enumerable: true, get: function () { return tslib_1.__importDefault(StageChannel_1).default; } });
var StageInstance_1 = require("./structures/StageInstance");
Object.defineProperty(exports, "StageInstance", { enumerable: true, get: function () { return tslib_1.__importDefault(StageInstance_1).default; } });
var Team_1 = require("./structures/Team");
Object.defineProperty(exports, "Team", { enumerable: true, get: function () { return tslib_1.__importDefault(Team_1).default; } });
var TextableChannel_1 = require("./structures/TextableChannel");
Object.defineProperty(exports, "TextableChannel", { enumerable: true, get: function () { return tslib_1.__importDefault(TextableChannel_1).default; } });
var TextChannel_1 = require("./structures/TextChannel");
Object.defineProperty(exports, "TextChannel", { enumerable: true, get: function () { return tslib_1.__importDefault(TextChannel_1).default; } });
var ThreadChannel_1 = require("./structures/ThreadChannel");
Object.defineProperty(exports, "ThreadChannel", { enumerable: true, get: function () { return tslib_1.__importDefault(ThreadChannel_1).default; } });
var TypedCollection_1 = require("./util/TypedCollection");
Object.defineProperty(exports, "TypedCollection", { enumerable: true, get: function () { return tslib_1.__importDefault(TypedCollection_1).default; } });
var TypedEmitter_1 = require("./util/TypedEmitter");
Object.defineProperty(exports, "TypedEmitter", { enumerable: true, get: function () { return tslib_1.__importDefault(TypedEmitter_1).default; } });
var UnavailableGuild_1 = require("./structures/UnavailableGuild");
Object.defineProperty(exports, "UnavailableGuild", { enumerable: true, get: function () { return tslib_1.__importDefault(UnavailableGuild_1).default; } });
var UncaughtError_1 = require("./util/UncaughtError");
Object.defineProperty(exports, "UncaughtError", { enumerable: true, get: function () { return tslib_1.__importDefault(UncaughtError_1).default; } });
var User_1 = require("./structures/User");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return tslib_1.__importDefault(User_1).default; } });
var Util_1 = require("./util/Util");
Object.defineProperty(exports, "Util", { enumerable: true, get: function () { return tslib_1.__importDefault(Util_1).default; } });
var VoiceChannel_1 = require("./structures/VoiceChannel");
Object.defineProperty(exports, "VoiceChannel", { enumerable: true, get: function () { return tslib_1.__importDefault(VoiceChannel_1).default; } });
var Webhook_1 = require("./structures/Webhook");
Object.defineProperty(exports, "Webhook", { enumerable: true, get: function () { return tslib_1.__importDefault(Webhook_1).default; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx3REFBOEI7QUFDOUIscUVBQXFFO0FBQ3JFLGdEQUEwRDtBQUFqRCwySEFBQSxPQUFPLE9BQVc7QUFDM0Isd0RBQWtFO0FBQXpELG1JQUFBLE9BQU8sT0FBZTtBQUMvQix3RUFBa0Y7QUFBekUsbUpBQUEsT0FBTyxPQUF1QjtBQUN2QyxvRkFBOEY7QUFBckYsK0pBQUEsT0FBTyxPQUE2QjtBQUM3Qyx3REFBa0U7QUFBekQsbUlBQUEsT0FBTyxPQUFlO0FBQy9CLHNFQUFnRjtBQUF2RSxpSkFBQSxPQUFPLE9BQXNCO0FBQ3RDLHNEQUFnRTtBQUF2RCxpSUFBQSxPQUFPLE9BQWM7QUFDOUIsZ0ZBQTBGO0FBQWpGLDJKQUFBLE9BQU8sT0FBMkI7QUFDM0MsMENBQW9EO0FBQTNDLHFIQUFBLE9BQU8sT0FBUTtBQUN4Qix3Q0FBa0Q7QUFBekMseUhBQUEsT0FBTyxPQUFVO0FBQzFCLGdFQUEwRTtBQUFqRSwySUFBQSxPQUFPLE9BQW1CO0FBQ25DLG1DQUE2QztBQUFwQyx5SEFBQSxPQUFPLE9BQVU7QUFDMUIsb0VBQThFO0FBQXJFLCtJQUFBLE9BQU8sT0FBcUI7QUFDckMsc0RBQTRCO0FBQzVCLGlFQUF5QztBQUN6QyxzRUFBZ0Y7QUFBdkUsaUpBQUEsT0FBTyxPQUFzQjtBQUN0QyxnREFBMEQ7QUFBakQsaUlBQUEsT0FBTyxPQUFjO0FBQzlCLDBFQUFvRjtBQUEzRSxxSkFBQSxPQUFPLE9BQXdCO0FBQ3hDLDREQUFzRTtBQUE3RCw2SUFBQSxPQUFPLE9BQW9CO0FBQ3BDLDREQUFzRTtBQUE3RCw2SUFBQSxPQUFPLE9BQW9CO0FBQ3BDLDBEQUFvRTtBQUEzRCxxSUFBQSxPQUFPLE9BQWdCO0FBQ2hDLDBEQUFvRTtBQUEzRCxxSUFBQSxPQUFPLE9BQWdCO0FBQ2hDLHVEQUFpRTtBQUF4RCxxSUFBQSxPQUFPLE9BQWdCO0FBQ2hDLDBEQUFvRTtBQUEzRCxxSUFBQSxPQUFPLE9BQWdCO0FBQ2hDLDRDQUFzRDtBQUE3Qyx1SEFBQSxPQUFPLE9BQVM7QUFDekIsMERBQW9FO0FBQTNELHFJQUFBLE9BQU8sT0FBZ0I7QUFDaEMsd0RBQWtFO0FBQXpELG1JQUFBLE9BQU8sT0FBZTtBQUMvQixzRkFBZ0c7QUFBdkYsaUtBQUEsT0FBTyxPQUE4QjtBQUM5Qyw4RUFBd0Y7QUFBL0UsK0pBQUEsT0FBTyxPQUE2QjtBQUM3Qyw4Q0FBd0Q7QUFBL0MseUhBQUEsT0FBTyxPQUFVO0FBQzFCLDhDQUF3RDtBQUEvQyx5SEFBQSxPQUFPLE9BQVU7QUFDMUIsZ0RBQTBEO0FBQWpELDJIQUFBLE9BQU8sT0FBVztBQUMzQiw4RUFBd0Y7QUFBL0UseUpBQUEsT0FBTyxPQUEwQjtBQUMxQyxzS0FBc0s7QUFDdEssd0NBQWtEO0FBQXpDLHVIQUFBLE9BQU8sT0FBUztBQUN6QixzREFBZ0U7QUFBdkQsaUlBQUEsT0FBTyxPQUFjO0FBQzlCLGtEQUE0RDtBQUFuRCxtSUFBQSxPQUFPLE9BQWU7QUFDL0Isc0VBQWdGO0FBQXZFLGlKQUFBLE9BQU8sT0FBc0I7QUFDdEMsc0RBQWdFO0FBQXZELGlJQUFBLE9BQU8sT0FBYztBQUM5Qix3RUFBa0Y7QUFBekUsbUpBQUEsT0FBTyxPQUF1QjtBQUN2QyxnRUFBMEU7QUFBakUsMklBQUEsT0FBTyxPQUFtQjtBQUNuQyw4REFBd0U7QUFBL0QseUlBQUEsT0FBTyxPQUFrQjtBQUNsQywwRUFBb0Y7QUFBM0UscUpBQUEsT0FBTyxPQUF3QjtBQUN4Qyx3RUFBa0Y7QUFBekUsbUpBQUEsT0FBTyxPQUF1QjtBQUN2QyxrREFBNEQ7QUFBbkQsbUlBQUEsT0FBTyxPQUFlO0FBQy9CLDBDQUFvRDtBQUEzQyxxSEFBQSxPQUFPLE9BQVE7QUFDeEIsZ0VBQXdDO0FBQ3hDLDBFQUFvRjtBQUEzRSwySkFBQSxPQUFPLE9BQTJCO0FBQzNDLDREQUFzRTtBQUE3RCw2SUFBQSxPQUFPLE9BQW9CO0FBQ3BDLHlDQUFtRDtBQUExQyx1SEFBQSxPQUFPLE9BQVM7QUFDekIsdURBQWlFO0FBQXhELHFJQUFBLE9BQU8sT0FBZ0I7QUFDaEMsMERBQW9FO0FBQTNELHFJQUFBLE9BQU8sT0FBZ0I7QUFDaEMsNERBQXNFO0FBQTdELHVJQUFBLE9BQU8sT0FBaUI7QUFDakMsMENBQW9EO0FBQTNDLHFIQUFBLE9BQU8sT0FBUTtBQUN4QixnRUFBMEU7QUFBakUsMklBQUEsT0FBTyxPQUFtQjtBQUNuQyx3REFBa0U7QUFBekQsbUlBQUEsT0FBTyxPQUFlO0FBQy9CLDREQUFzRTtBQUE3RCx1SUFBQSxPQUFPLE9BQWlCO0FBQ2pDLDBEQUFvRTtBQUEzRCwySUFBQSxPQUFPLE9BQW1CO0FBQ25DLG9EQUE4RDtBQUFyRCxxSUFBQSxPQUFPLE9BQWdCO0FBQ2hDLGtFQUE0RTtBQUFuRSw2SUFBQSxPQUFPLE9BQW9CO0FBQ3BDLHNEQUFnRTtBQUF2RCx1SUFBQSxPQUFPLE9BQWlCO0FBQ2pDLDBDQUFvRDtBQUEzQyxxSEFBQSxPQUFPLE9BQVE7QUFDeEIsb0NBQThDO0FBQXJDLHFIQUFBLE9BQU8sT0FBUTtBQUN4QiwwREFBb0U7QUFBM0QscUlBQUEsT0FBTyxPQUFnQjtBQUNoQyxnREFBMEQ7QUFBakQsMkhBQUEsT0FBTyxPQUFXIn0=