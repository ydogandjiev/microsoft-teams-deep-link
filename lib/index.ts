import urljoin from "url-join";

export interface Entity {
  entityId: string;
  entityWebUrl: string;
  entityLabel: string;
  subEntityId?: string;
  canvasUrl?: string;
  channelId?: string;
}

export interface Meeting {
  conversationId: string;
}

export interface Message {
  conversationId: string;
  messageId: string;
}

export interface Call {
  conversationId: string;
  organizerId: string;
  rootMessageId?: string;
  messageId?: string;
  title?: string;
}

export interface Team {
  teamId: string;
}

export interface Channel {
  channelId: string;
  displayName: string;
}

interface DeepLink {
  type: string;
  containerId: string;
  itemId: string;
  label?: string;
  webUrl?: string;
  context?: string;
  groupId?: string;
  tenantId?: string;
}

function getDeepLinkUrl(deepLink: DeepLink): string {
  let deepLinkUrl = `https://teams.microsoft.com/l/${deepLink.type}/${deepLink.containerId}/${deepLink.itemId}`;

  if (deepLink.webUrl) {
    deepLinkUrl = urljoin(deepLinkUrl, `?webUrl=${deepLink.webUrl}`);
  }

  if (deepLink.label) {
    deepLinkUrl = urljoin(deepLinkUrl, `?label=${deepLink.label}`);
  }

  if (deepLink.context) {
    deepLinkUrl = urljoin(deepLinkUrl, `?context=${deepLink.context}`);
  }

  if (deepLink.groupId) {
    deepLinkUrl = urljoin(deepLinkUrl, `&groupId=${deepLink.groupId}`);
  }

  if (deepLink.tenantId) {
    deepLinkUrl = urljoin(deepLinkUrl, `&tenantId=${deepLink.tenantId}`);
  }

  return deepLinkUrl;
}

/* tslint:disable:no-bitwise */
/**
 * Hashes a string value to a numeric value using djb2 hashing algorithm.
 * See https://en.wikipedia.org/wiki/Universal_hashing#Hashing_strings AND http://www.cse.yorku.ca/~oz/hash.html for algorithm details.
 * @param {string} str String value to be hashed
 * @return {number} - A positive numeric value
 */
function djb2_hash(str: string): number {
  let hash = 5381;

  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
  }

  return hash >>> 0; // Ensure positive number
}
/* tslint:enable:no-bitwise */

const deeplinkDjb2Prefix = "_djb2_msteams_prefix_";

/**
 * @method: Returns a Microsoft Teams deep link to the specified entity.
 * @param {Entity} entity The object describing the entity the deep link should point to.
 * @param {string} appId The ID of the Microsoft Teams app this entity belongs to.
 * @return {string} The Microsoft Teams entity deep link.
 */
export function getEntityDeepLink(entity: Entity, appId: string, groupId?: string, tenantId?: string): string {
  const entityId =
    deeplinkDjb2Prefix +
    djb2_hash(appId + ":" + entity.entityId.replace(/\+/g, " "));

  const entityWebUrl = encodeURIComponent(entity.entityWebUrl);
  const entityLabel = encodeURIComponent(entity.entityLabel);

  let context;
  if (entity.subEntityId || entity.canvasUrl || entity.channelId) {
    context = encodeURIComponent(JSON.stringify({
      subEntityId: entity.subEntityId,
      canvasUrl: entity.canvasUrl,
      channelId: entity.channelId
    }));
  }

  const deepLink: DeepLink = {
    type: "entity",
    containerId: appId,
    itemId: entityId,
    label: entityLabel,
    context: context,
    webUrl: entityWebUrl,
    groupId: groupId,
    tenantId: tenantId
  };

  return getDeepLinkUrl(deepLink);
}

export function getMeetingDeepLink(call: Call, tenantId?: string): string {
  if (!call.conversationId) {
    throw new Error("The conversationId is required")
  }

  let context: any = {
    Origin: 'web',
    Oid: call.organizerId,
    MessageId: call.messageId
  };

  if (tenantId) {
    context.Tid = tenantId;
  }

  if (call.messageId) {
    context.MessageId = call.messageId;
  }

  if (call.messageId) {
    context.MessageId = call.messageId;
  }

  if (call.title) {
    context.Title = call.title;
  }

  const deepLink: DeepLink = {
    type: 'meetup',
    containerId: call.conversationId,
    itemId: call.rootMessageId || '0',
    label: call.title,
    context: JSON.stringify(context)
  };

  return getDeepLinkUrl(deepLink);
}

export function getTeamDeepLink(team: Team, groupId?: string, tenantId?: string): string {
  if (!team.teamId) {
    throw new Error("The teamId is required");
  }

  const deepLink: DeepLink = {
    type: "team",
    containerId: team.teamId,
    itemId: "conversations",
    groupId: groupId,
    tenantId: tenantId,
  };

  return getDeepLinkUrl(deepLink);
}

export function getMessageDeepLink(message: Message, groupId?: string, tenantId?: string): string {
  if (!message.conversationId || !message.messageId) {
    throw new Error("The conversationId and messageId are required");
  }

  const deepLink: DeepLink = {
    type: "message",
    containerId: message.conversationId,
    itemId: message.messageId,
    groupId: groupId,
    tenantId: tenantId,
  }

  return getDeepLinkUrl(deepLink);
}

export function getChannelDeepLink(channel: Channel, displayName: string, groupId?: string, tenantId?: string): string {
  if (!channel.channelId) {
    throw new Error("The channelId is required");
  }

  const deepLink: DeepLink = {
    type: "channel",
    containerId: channel.channelId,
    itemId: encodeURIComponent(channel.displayName),
    groupId: groupId,
    tenantId: tenantId,
  };

  return getDeepLinkUrl(deepLink);
}
