'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Box = require('3box');
var ethers = require('ethers');
var FIRST_MOD = "did:3:1111";

var getBobBox = exports.getBobBox = async function getBobBox() {
    // Will be a check once API is up, for now going to open user box
    return await createBox();
};

var createBox = async function createBox() {
    var provider = await get3BoxWalletProvider();
    try {
        var box = await Box.openBox(provider.address, provider);
        await box.public.set('name', 'BoB');
        return box;
    } catch (err) {
        console.log(err.messsage);
    }
};

var get3BoxWalletProvider = exports.get3BoxWalletProvider = async function get3BoxWalletProvider() {
    var HDWalletProvider = require("truffle-privatekey-provider");
    var provider = new HDWalletProvider("27F2103FD359D41D49FFB702530BB57B778D2E70E89DED7C8B43289A2402C19B", "https://goerli.infura.io/v3/82c35d2e074c4021a54f6fd4c0bde238");
    return provider;
};

// This method checks if the domain exists in the domain registry.
// If not, it deploys a domain space and adds the domain to the registry
// If so, it returns the existing domain space
var getDomainSpace = exports.getDomainSpace = async function getDomainSpace(url) {
    var provider = await get3BoxWalletProvider();
    var urlHex = ethers.utils.id(url);
    try {
        var box = await Box.openBox(provider.address, provider);
        var domainRegistrySpace = await box.openSpace('domainRegistry');
        var urlCheck = await domainRegistrySpace.public.get(url);
        if (urlCheck == undefined || urlCheck == null) {
            console.log('Creating new url space at ' + url);
            await domainRegistrySpace.public.set(url, true);
        } else {
            console.log('Using existing space');
        }
        urlCheck = await domainRegistrySpace.public.get(urlHex);
        var domainSpace = await box.openSpace(urlHex);
        return domainSpace;
    } catch (err) {
        console.log(err);
        console.log(err.messsage);
    }
};

var createPostThread = exports.createPostThread = async function createPostThread(url, title, description) {
    var provider = await get3BoxWalletProvider();
    var box = await Box.openBox(provider.address, provider);
    try {
        var space = await getDomainSpace(url);
        var postObject = { title: title, description: description };
        var postObjectHex = ethers.utils.id(JSON.stringify(postObject));
        var publicThread = await space.joinThread(postObjectHex, { firstModerator: FIRST_MOD });
        await publicThread.post(JSON.stringify(postObject));
        var postDirThread = await space.joinThread('postDirectory', { firstModerator: FIRST_MOD });
        await postDirThread.post(publicThread._address); // Posts address of thread to directory so all threads can be rendered
        return publicThread;
    } catch (err) {
        console.log(err.messsage);
    }
};

var getAllThreads = exports.getAllThreads = async function getAllThreads(url) {
    try {
        var space = await getDomainSpace(url);
        var postDirThread = await space.joinThread('postDirectory', { firstModerator: FIRST_MOD });
        var threads = await postDirThread.getPosts();
        var threadObjs = [];
        for (var i = 0; i < threads.length; i += 1) {
            var thread = await space.joinThreadByAddress(threads[i].message);
            var posts = await thread.getPosts();
            threadObjs.push({
                address: threads[i].message,
                posts: posts
            });
        }
        return threadObjs;
    } catch (err) {
        console.log(err.messsage);
    }
};

var commentOnPostThread = exports.commentOnPostThread = async function commentOnPostThread(url, threadAddress, comment) {
    var space = await getDomainSpace(url);
    try {
        var publicThread = await space.joinThreadByAddress(threadAddress);
        await publicThread.post(comment);
        var posts = await publicThread.getPosts();
        return posts;
    } catch (err) {
        console.log(err.messsage);
    }
};

var createAdminThread = exports.createAdminThread = async function createAdminThread(url) {
    var provider = await get3BoxWalletProvider();
    var space = await getDomainSpace(url);
    try {
        var thread = await space.joinThread('DAO Investor Collaboration Thread', {
            members: true
        });
        await thread.post('DAO Investor Comment 1');
        await thread.post('DAO Investor Comment 2');
        await thread.post('DAO Investor Comment 3');
        var posts = await thread.getPosts();
        return posts;
    } catch (err) {
        console.log(err);
    }
};