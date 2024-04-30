const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("TrackingModule", (m) => {
    const tracking = m.contract("Tracking", []);

  return { tracking };
});
