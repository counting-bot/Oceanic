/// <reference types="node" />
import type Client from "../Client";
import { type ImageFormat } from "../Constants.js";
import type { AllowedMentions, AnyChannel, AnyThreadChannel, Component, Embed, EmbedOptions, MessageActionRow, ModalActionRow, RawAllowedMentions, RawChannel, RawComponent, RawEmbed, RawEmbedOptions, RawMessageActionRow, RawModalActionRow, RawThreadChannel, ToComponentFromRaw, ToRawFromComponent } from "../types/channels.js";
import type { RawMember, RawSticker, RESTMember, Sticker } from "../types/guilds.js";
import type { ApplicationCommandOptions, RawApplicationCommandOption } from "../types/application-commands.js";
import Member from "../structures/Member.js";
/** A general set of utilities. These are intentionally poorly documented, as they serve almost no usefulness to outside developers. */
export default class Util {
    #private;
    static BASE64URL_REGEX: RegExp;
    constructor(client: Client);
    /** @hidden intentionally not documented - this is an internal function */
    _convertImage(image: Buffer | string, name: string): string;
    componentToParsed<T extends RawComponent>(component: T): ToComponentFromRaw<T>;
    componentToRaw<T extends Component>(component: T): ToRawFromComponent<T>;
    componentsToParsed<T extends RawModalActionRow | RawMessageActionRow>(components: Array<T>): T extends RawModalActionRow ? Array<ModalActionRow> : T extends RawMessageActionRow ? Array<MessageActionRow> : never;
    componentsToRaw<T extends ModalActionRow | MessageActionRow>(components: Array<T>): T extends ModalActionRow ? Array<RawModalActionRow> : T extends MessageActionRow ? Array<RawMessageActionRow> : never;
    convertImage(img: Buffer | string): string;
    convertSticker(raw: RawSticker): Sticker;
    embedsToParsed(embeds: Array<RawEmbed>): Array<Embed>;
    embedsToRaw(embeds: Array<EmbedOptions>): Array<RawEmbedOptions>;
    formatAllowedMentions(allowed?: AllowedMentions): RawAllowedMentions;
    formatImage(url: string, format?: ImageFormat, size?: number): string;
    getMagic(file: Buffer, len?: number): string;
    optionToParsed(option: RawApplicationCommandOption): ApplicationCommandOptions;
    optionToRaw(option: ApplicationCommandOptions): RawApplicationCommandOption;
    updateChannel<T extends AnyChannel>(channelData: RawChannel): T;
    updateMember(guildID: string, memberID: string, member: RawMember | RESTMember): Member;
    updateThread<T extends AnyThreadChannel>(threadData: RawThreadChannel): T;
}
export declare function is<T>(input: unknown): input is T;
