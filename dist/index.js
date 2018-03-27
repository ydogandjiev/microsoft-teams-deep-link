"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-bitwise */
/**
 * Hashes a string value to a numeric value using djb2 hashing algorithm.
 * See https://en.wikipedia.org/wiki/Universal_hashing#Hashing_strings AND http://www.cse.yorku.ca/~oz/hash.html for algorithm details.
 * @param {string} str String value to be hashed
 * @return {number} - A positive numeric value
 */
function djb2_hash(str) {
    var hash = 5381;
    for (var i = 0; i < str.length; i++) {
        hash = (hash << 5) + hash + str.charCodeAt(i);
    }
    return hash >>> 0; // Ensure positive number
}
/* tslint:enable:no-bitwise */
var deeplinkDjb2Prefix = "_djb2_msteams_prefix_";
/**
 * @method: Returns a Microsoft Teams deep link to the specified entity.
 * @param {Entity} entity The object describing the entity the deep link should point to.
 * @param {string} appId The ID of the Microsoft Teams app this entity belongs to.
 * @return {string} The Microsoft Teams entity deep link.
 */
function getEntityDeepLink(entity, appId, groupId, tenantId) {
    var entityId = deeplinkDjb2Prefix +
        djb2_hash(appId + ":" + entity.entityId.replace(/\+/g, " "));
    var entityWebUrl = encodeURIComponent(entity.entityWebUrl);
    var entityLabel = encodeURIComponent(entity.entityLabel);
    var deepLink = "https://teams.microsoft.com/l/entity/" + appId + "/" + entityId + "?webUrl=" + entityWebUrl + "&label=" + entityLabel;
    if (entity.subEntityId || entity.canvasUrl || entity.channelId) {
        var context = encodeURIComponent(JSON.stringify({
            subEntityId: entity.subEntityId,
            canvasUrl: entity.canvasUrl,
            channelId: entity.channelId
        }));
        deepLink = deepLink.concat("&context=" + context);
    }
    if (groupId) {
        deepLink = deepLink.concat("&groupId=" + groupId);
    }
    if (tenantId) {
        deepLink = deepLink.concat("&tenantId=" + tenantId);
    }
    return deepLink;
}
exports.getEntityDeepLink = getEntityDeepLink;
