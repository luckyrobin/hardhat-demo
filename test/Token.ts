const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
import { ethers } from "hardhat";

describe("Token contract", function () {
  async function deployTokenFixture() {
    const Token = await ethers.getContractFactory("Token");
    const [owner, addr1, addr2] = await ethers.getSigners();

    const hardhatToken = await Token.deploy();

    await hardhatToken.deployed();

    // Fixtures can return anything you consider useful for your tests
    return { Token, hardhatToken, owner, addr1, addr2 };
  }

  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const { hardhatToken, owner } = await loadFixture(deployTokenFixture);

    const ownerBalance = await hardhatToken.balanceOf(owner.address);
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });

  it("Should transfer tokens between accounts", async function () {
    const { hardhatToken, owner, addr1, addr2 } = await loadFixture(deployTokenFixture);

    await hardhatToken.transfer(addr1.address, 50);
    expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50);
    expect(await hardhatToken.balanceOf(owner.address)).to.equal(999950);

    await hardhatToken.connect(addr1).transfer(addr2.address, 50);
    expect(await hardhatToken.balanceOf(addr2.address)).to.equal(50);
    expect(await hardhatToken.balanceOf(addr1.address)).to.equal(0);
  });
});