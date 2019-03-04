"use strict";

var expect = require("chai").expect;
var index = require("../dist/index.js");

describe("DeepLinkHelper", () => {
  describe("getEntityDeepLink function test", () => {
    it("with only required parameters", () => {
      var deepLink = index.getEntityDeepLink(
        {
          entityId: "someEntityId",
          entityWebUrl: "someEntityWebUrl",
          entityLabel: "someEntityLabel"
        },
        "someAppId"
      );
      expect(deepLink).to.equal(
        "https://teams.microsoft.com/l/entity/someAppId/_djb2_msteams_prefix_3116810623?webUrl=someEntityWebUrl&label=someEntityLabel"
      );
    });
  
    it("with context", () => {
      var deepLink = index.getEntityDeepLink(
        {
          entityId: "someEntityId",
          entityWebUrl: "someEntityWebUrl",
          entityLabel: "someEntityLabel",
          subEntityId: "someSubEntityId",
          canvasUrl: "someCanvasUrl",
          channelId: "someChannelId"
        },
        "someAppId"
      );
      expect(deepLink).to.equal(
        "https://teams.microsoft.com/l/entity/someAppId/_djb2_msteams_prefix_3116810623?webUrl=someEntityWebUrl&label=someEntityLabel&context=%7B%22subEntityId%22%3A%22someSubEntityId%22%2C%22canvasUrl%22%3A%22someCanvasUrl%22%2C%22channelId%22%3A%22someChannelId%22%7D"
      );
    });
  
    it("with groupId and tenantId", () => {
      var deepLink = index.getEntityDeepLink(
        {
          entityId: "someEntityId",
          entityWebUrl: "someEntityWebUrl",
          entityLabel: "someEntityLabel"
        },
        "someAppId",
        "someGroupId",
        "someTenantId"
      );
      expect(deepLink).to.equal(
        "https://teams.microsoft.com/l/entity/someAppId/_djb2_msteams_prefix_3116810623?webUrl=someEntityWebUrl&label=someEntityLabel&groupId=someGroupId&tenantId=someTenantId"
      );
    });
  
    it("with real world data", () => {
      var deepLink = index.getEntityDeepLink(
        {
          entityId: "xpOK-uJ1o0C7XEiqSfiKAGQACPtV",
          entityWebUrl:
            "https://tasks.office.com/microsoft.onmicrosoft.com/Home/PlanViews/xpOK-uJ1o0C7XEiqSfiKAGQACPtV",
          entityLabel: "Planner Teams Tasks",
          subEntityId: null,
          canvasUrl:
            "https://tasks.office.com/microsoft.onmicrosoft.com/Home/PlannerFrame?page=7&planId=xpOK-uJ1o0C7XEiqSfiKAGQACPtV&auth_pvr=Orgid&auth_upn={upn}&mkt={locale}",
          channelId: "19:cc8ee9968b83481c95b8249d616a8d09@thread.skype"
        },
        "com.microsoft.teamspace.tab.planner",
        "ac7196fa-d154-4c9c-a390-cae47e82dd90",
        "72f988bf-86f1-41af-91ab-2d7cd011db47"
      );
      expect(deepLink).to.equal(
        "https://teams.microsoft.com/l/entity/com.microsoft.teamspace.tab.planner/_djb2_msteams_prefix_365907225?webUrl=https%3A%2F%2Ftasks.office.com%2Fmicrosoft.onmicrosoft.com%2FHome%2FPlanViews%2FxpOK-uJ1o0C7XEiqSfiKAGQACPtV&label=Planner%20Teams%20Tasks&context=%7B%22subEntityId%22%3Anull%2C%22canvasUrl%22%3A%22https%3A%2F%2Ftasks.office.com%2Fmicrosoft.onmicrosoft.com%2FHome%2FPlannerFrame%3Fpage%3D7%26planId%3DxpOK-uJ1o0C7XEiqSfiKAGQACPtV%26auth_pvr%3DOrgid%26auth_upn%3D%7Bupn%7D%26mkt%3D%7Blocale%7D%22%2C%22channelId%22%3A%2219%3Acc8ee9968b83481c95b8249d616a8d09%40thread.skype%22%7D&groupId=ac7196fa-d154-4c9c-a390-cae47e82dd90&tenantId=72f988bf-86f1-41af-91ab-2d7cd011db47"
      );
    });
  });
  
  describe("getMeetingDeepLink", () => {
  });

  describe("getTeamDeepLink", () => {
  });

  describe("getMessageDeepLink", () => {
  });

  describe("getChannelDeepLink", () => {
  });
});
