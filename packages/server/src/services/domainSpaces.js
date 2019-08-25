const Box = require('3box');
const ethers = require('ethers');
const FIRST_MOD = "did:3:1111";

export const getBobBox = async() => {
    // Will be a check once API is up, for now going to open user box
    return(await createBox());
}

const createBox = async() => {
    const provider = await get3BoxWalletProvider();
    try {
        const box = await Box.openBox(provider.address, provider);
        await box.public.set('name', 'BoB');
        return box;
    } catch (err) {
        console.log(err.messsage);
    }
}

export const get3BoxWalletProvider = async() => {
    const HDWalletProvider = require("truffle-privatekey-provider");
    var provider = new HDWalletProvider("27F2103FD359D41D49FFB702530BB57B778D2E70E89DED7C8B43289A2402C19B", "https://goerli.infura.io/v3/82c35d2e074c4021a54f6fd4c0bde238");
    return provider;
}

// This method checks if the domain exists in the domain registry.
// If not, it deploys a domain space and adds the domain to the registry
// If so, it returns the existing domain space
export const getDomainSpace = async(url) => {
	const provider = await get3BoxWalletProvider();
	const urlHex = ethers.utils.id(url);
    try {
        const box = await Box.openBox(provider.address, provider);
        const domainRegistrySpace = await box.openSpace('domainRegistry');
        let urlCheck = await domainRegistrySpace.public.get(url);
        if (urlCheck == undefined || urlCheck == null) {
          console.log(`Creating new url space at ${url}`);
          await domainRegistrySpace.public.set(url, true);
        } else {
          console.log('Using existing space')
        }
        urlCheck = await domainRegistrySpace.public.get(urlHex);
        let domainSpace = await box.openSpace(urlHex);
        return(domainSpace);
    } catch (err) {
		console.log(err)
        console.log(err.messsage);
    }
}

export const createPostThread = async(url, title, description) => {	
	const provider = await get3BoxWalletProvider();
	const box = await Box.openBox(provider.address, provider);
    try {
		const space = await getDomainSpace(url);
		const postObject = {title, description};
		const postObjectHex = ethers.utils.id(JSON.stringify(postObject));
        const publicThread = await space.joinThread(postObjectHex, {firstModerator: FIRST_MOD});
		await publicThread.post(JSON.stringify(postObject));
		const postDirThread = await space.joinThread('postDirectory', {firstModerator: FIRST_MOD});
		await postDirThread.post(publicThread._address); // Posts address of thread to directory so all threads can be rendered
		return(publicThread);
    } catch (err) {
        console.log(err.messsage);
    }
}

export const getAllThreads = async(url) => {
	try {
		const space = await getDomainSpace(url);
		const postDirThread = await space.joinThread('postDirectory', {firstModerator: FIRST_MOD});
		const threads = await postDirThread.getPosts();
		const threadObjs = [];
		for(var i = 0; i < threads.length; i += 1) {
			const thread = await space.joinThreadByAddress(threads[i].message)
			const posts = await thread.getPosts();
			threadObjs.push({
				address: threads[i].message,
				posts
			});
		}
		return(threadObjs);
	} catch (err) {
		console.log(err.messsage);
	}
}

export const commentOnPostThread = async(url, threadAddress, comment) => {
	const space = await getDomainSpace(url);
    try {
        const publicThread = await space.joinThreadByAddress(threadAddress);
		await publicThread.post(comment);
		const posts = await publicThread.getPosts();
		return(posts)
    } catch (err) {
        console.log(err.messsage);
    }
}

export const createAdminThread = async(url) => {
	const provider = await get3BoxWalletProvider();
	const space = await getDomainSpace(url);
    try {
        const thread = await space.joinThread('DAO Investor Collaboration Thread', {
			members: true
		});
		await thread.post('DAO Investor Comment 1');
        await thread.post('DAO Investor Comment 2');
		await thread.post('DAO Investor Comment 3');
		const posts = await thread.getPosts();
		return(posts);
    } catch (err) {
        console.log(err);
    }
}