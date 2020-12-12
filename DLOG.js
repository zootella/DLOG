
//----------------------------------------------------------------------------------
//----    ______          _____   ______    ----------------------------------------
//----    |     \ |      |     | |  ____    ----  HYPERMEDIA WEBLOG AND SOCIAL  ----
//----    |_____/ |_____ |_____| |_____|    ----  FEED FOR THE "http", "hyper", ----
//----                                      ----  AND "file" URI SCHEMES        ----
//----------------------------------------------------------------------------------

(function() { // All the code is in an unnamed function to avoid unintentionally making things global

// Export with a single line like exporty({function1, function2});
function exporty(o) { var exportToGlobal = true; // Set true to not have to import stuff
	var d; // Destination object where we'll attach all the exports
	if (exportToGlobal) d = window; // Simple and works everywhere
	if (!d && module && module.exports) d = module.exports; // Node
	if (!d) d = window; // Fall back to global
	for (k in o) { if (d[k]) logError("exporty overwriting", { exists: o[k], incoming: d[k] }); d[k] = o[k]; }
}








//tiny tests
var tests = [];
var assertionsPassed, assertionsFailed, testsThrew;
function test(f) {
	tests.push(f);
}
function ok(assertion) {
	if (assertion) {
		assertionsPassed++;
	} else {
		assertionsFailed++;
		console.error("Test not ok, second line number expanded below:");
	}
}
function runTests() {
	var g = String.fromCodePoint(0x2705);  // Green check emoji
	var r = String.fromCodePoint(0x274C);  // Red X
	var a = String.fromCodePoint(0x1F815); // Up arrow

	assertionsPassed = 0;
	assertionsFailed = 0;
	testsThrew = 0;
	for (var i = 0; i < tests.length; i++) {
		try { tests[i](); } catch (e) { testsThrew++; console.error(e); }
	}
	if (assertionsFailed || testsThrew) {
		console.error(`${r} ${a}${a}${a} Tests failed ${a}${a}${a} ${r}`);
	} else {
		console.log(`${g} ${assertionsPassed} assertions in ${tests.length} tests all passed ${g}`);
	}
}
exporty({test, ok, runTests});

var noop = (function(){});
exporty({noop});










//   _   _                      
//  | | | | ___  _ __ ___   ___ 
//  | |_| |/ _ \| '_ ` _ \ / _ \
//  |  _  | (_) | | | | | |  __/
//  |_| |_|\___/|_| |_| |_|\___|
//                              

var homePage = registerComponent({
name: "homePage",
template: `<homeTag :m="m" />`,
watch: { $route(to, from) { this.m = homeTag.make(); } },
data() { keepPageData(this); return { m: homeTag.make(), remake() { this.m = homeTag.make(); } } }
});

var homeTag = registerComponent({
name: "homeTag",
props: ["m"],
template: `
<div>
</div>
`,
make() {
var empty = {};
try {
	var m = {};

	//redirect to the title of this installation /posts if exported or not ours, or /feed if editable in beaker
	editRoute(`/${brand}/${lookupTitle(hash1()).full}/${isEditable() ? "feed" : "posts"}`);

	return m;
} catch (e) { logError("homeTag make", {e}); return empty; }
}
});

var topTag = registerComponent({
name: "topTag",
props: ["m"],
template: `
<div>
	<installTag :m="m.installTagModel" />
	<myTag :m="m.myTagModel" />
	<titleTag :m="m.titleTagModel" />
</div>
`,
make() {
var empty = {
	installTagModel: installTag.make(),
	myTagModel: myTag.make(),
	titleTagModel: titleTag.make(),
	navigationTagModel: navigationTag.make(),
};
try {

	var m = {};
	m.installTagModel = installTag.make();
	m.myTagModel = myTag.make();
	m.titleTagModel = titleTag.make();
	m.navigationTagModel = navigationTag.make();

	simpleGather(getRouteSegments().hash2, true);//gather strong from hash2 navigate


	return m;

} catch (e) { logError("topTag make", {e}); return empty; }
}
});

var navigationTag = registerComponent({
name: "navigationTag",
props: ["m"],
template: `
<div>
	<p>
		<i>~ navigation tag ~</i>
		<router-link  to="/">Root</router-link>
		<router-link :to="m.home">Home</router-link>
		<router-link :to="m.feed">Feed</router-link>
		<router-link :to="m.posts">Posts</router-link>
		-
		<router-link  to="/demo">Demo</router-link>
		<router-link  to="/fresh">Fresh</router-link>
		<router-link  to="/mill">Mill</router-link>
		-
		<router-link :to="m.settings">Settings</router-link>
		<router-link :to="m.follows">Follows</router-link>
		<router-link :to="m.write">Write</router-link>
		<router-link :to="m.about">About</router-link>
		<router-link :to="m.system">System</router-link>
	</p>
	<p>
		<i>~ navigation tag ~</i>
		Feeds:
		<router-link :to="m.feedA">feed A</router-link>
		<router-link :to="m.feedB">feed B</router-link>
		<router-link :to="m.feedI">feed I</router-link>,
		posts:
		<router-link :to="m.postsA">posts A</router-link>
		<router-link :to="m.postsB">posts B</router-link>
		<router-link :to="m.postsI">posts I</router-link>,
		and likes:
		<router-link :to="m.likesA">likes A</router-link>
		<router-link :to="m.likesB">likes B</router-link>
		<router-link :to="m.likesI">likes I</router-link>
	</p>
</div>
`,
make() {
var empty = {
	home:     "/BLOG/b10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10g/",
	feed:     "/BLOG/b10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10g/feed",
	posts:    "/BLOG/b10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10g/posts",

	settings: "/BLOG/b10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10g/settings",
	follows:  "/BLOG/b10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10g/follows",
	write:    "/BLOG/b10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10g/write",
	about:    "/BLOG/b10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10g/about",
	system:   "/BLOG/b10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10g/system",

	feedA:    "/BLOG/b10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10g/feed",
	feedB:    "/BLOG/b10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10g/feed",
	feedI:    "/BLOG/b10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10g/feed",

	postsA:   "/BLOG/b10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10g/posts",
	postsB:   "/BLOG/b10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10g/posts",
	postsI:   "/BLOG/b10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10g/posts",

	likesA:   "/BLOG/b10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10g/likes",
	likesB:   "/BLOG/b10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10g/likes",
	likesI:   "/BLOG/b10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10gb10g/likes"
};
try {
	var m = {};

	m.home     = `/${brand}/${lookupTitle(hash1()).full}/${isEditable() ? "feed" : "posts"}`;
	m.feed     = `/${brand}/${lookupTitle(hash1()).full}/feed`;
	m.posts    = `/${brand}/${lookupTitle(hash1()).full}/posts`;

	m.settings = `/${brand}/${lookupTitle(hash1()).full}/settings`;
	m.follows  = `/${brand}/${lookupTitle(hash1()).full}/follows`;
	m.write    = `/${brand}/${lookupTitle(hash1()).full}/write`;
	m.about    = `/${brand}/${lookupTitle(hash1()).full}/about`;
	m.system   = `/${brand}/${lookupTitle(hash1()).full}/system`;

	m.feedA  = `/${brand}/8419b15dd118174d596d51027a97e85a49537bdc4ade330b503e588479ce847d/feed`;
	m.feedB  = `/${brand}/2e3d57995640fcb03103ec7c38f5f6aed8689e49395d0629c5b2e29cbba31925/feed`;
	m.feedI  = `/${brand}/67faabfa405ba9c578f26fcbde53a472ab5ff9651f4ed961c949c8dd960c98e9/feed`;

	m.postsA = `/${brand}/8419b15dd118174d596d51027a97e85a49537bdc4ade330b503e588479ce847d/posts`;
	m.postsB = `/${brand}/2e3d57995640fcb03103ec7c38f5f6aed8689e49395d0629c5b2e29cbba31925/posts`;
	m.postsI = `/${brand}/67faabfa405ba9c578f26fcbde53a472ab5ff9651f4ed961c949c8dd960c98e9/posts`;

	m.likesA = `/${brand}/8419b15dd118174d596d51027a97e85a49537bdc4ade330b503e588479ce847d/likes`;
	m.likesB = `/${brand}/2e3d57995640fcb03103ec7c38f5f6aed8689e49395d0629c5b2e29cbba31925/likes`;
	m.likesI = `/${brand}/67faabfa405ba9c578f26fcbde53a472ab5ff9651f4ed961c949c8dd960c98e9/likes`;

	return m;
} catch (e) { logError("homeTag make", {e}); return empty; }
}
});

var notFoundPage = registerComponent({
name: "notFoundPage",
template: `
<div>
	<p>Not Found</p>
	<p>Please check the URL, go back, or return <router-link to="/">Home</router-link>.</p>
</div>
`
});

exporty({homePage, homeTag, topTag, navigationTag, notFoundPage});

//navigate to a new page like the user clicked a link
function navigateBrowser(url) { window.location.href = url; }//to another page, like refresh, back goes back
function navigateRoute(route) { router.push(route); }//to another route, no refresh, back goes back
function editRoute(route) { router.replace(route); }//to another route, no refresh, back goes back twice
exporty({navigateBrowser, navigateRoute, editRoute});









var myTag = registerComponent({
name: "myTag",
props: ["m"],
template: `
<p v-if="m.show">
	My {{ m.brand }} <i>{{ m.title }}</i>
	<router-link :to="m.feed">My Feed</router-link>
	<router-link :to="m.posts">My Posts</router-link>
	<router-link :to="m.write">Write New Post</router-link>
	<router-link :to="m.follows">Blogs I'm Following</router-link>
	<router-link :to="m.settings">Settings</router-link>
</p>
`,
make() {
var empty = { show: false, brand: "", title: "", feed: "", posts: "", write: "", follows: "", settings: "" };
try {
	if (!isEditable()) return empty;

	var m = {};
	m.show = true;
	m.brand = brand;
	m.title = lookupTitle(hash1()).short;

	m.feed     = `/${brand}/${lookupTitle(hash1()).full}/feed`;
	m.posts    = `/${brand}/${lookupTitle(hash1()).full}/posts`;
	m.write    = `/${brand}/${lookupTitle(hash1()).full}/write`;
	m.follows  = `/${brand}/${lookupTitle(hash1()).full}/follows`;
	m.settings = `/${brand}/${lookupTitle(hash1()).full}/settings`;

	return m;
} catch (e) { logError("myTag make", {e}); return empty; }
}
});
exporty({myTag});

















































//   _____              _     
//  |  ___| __ ___  ___| |__  
//  | |_ | '__/ _ \/ __| '_ \ 
//  |  _|| | |  __/\__ \ | | |
//  |_|  |_|  \___||___/_| |_|
//                            

var freshPage = registerComponent({
name: "freshPage",
template: `<freshTag :m="m" />`,
watch: { $route(to, from) { this.m = freshTag.make(); } },
data() { keepPageData(this); return { m: freshTag.make(), remake() { this.m = freshTag.make(); } } }
});

var freshTag = registerComponent({
name: "freshTag",
props: ["m"],
template: `
<div>
	<topTag :m="m.topTagModel" />
	<h1>Fresh</h1>
	<p><i>~ fresh tag ~</i></p>
	<button @click="m.snippet">Snippet</button>
	<p>fresh tag made on "{{ m.stamp }}" and has message: "{{ m.message }}"</p>
	<p>Count {{ m.count }} <button @click="m.increment">Increment</button></p>
</div>
`,
make() {
var empty = {
	topTagModel: topTag.make(),
	snippet: noop, stamp: "", message: "", count: 0, increment: noop
};
try {
	var m = {};
	m.topTagModel = topTag.make();

	m.stamp = moment(now()).format("YYYY MMMM Do, h:mm:ss.SSS a");
	m.message = "starting message";
	m.count = 0;
	m.increment = function() { m.count++; }
	m.snippet = function() {
		log("fresh snippet");
	};

	return m;
} catch (e) { logError("freshTag make", {e}); return empty; }
}
});

exporty({freshPage, freshTag});

//   ____                       
//  |  _ \  ___ _ __ ___   ___  
//  | | | |/ _ \ '_ ` _ \ / _ \ 
//  | |_| |  __/ | | | | | (_) |
//  |____/ \___|_| |_| |_|\___/ 
//                              

var demoPage = registerComponent({
name: "demoPage",
template: `<demoTag :m="m" />`,
watch: { $route(to, from) { this.m = demoTag.make(); } },
data() { keepPageData(this); return { m: demoTag.make(), remake() { this.m = demoTag.make(); } } }
});

var demoTag = registerComponent({
name: "demoTag",
props: ["m"],
template: `
<div>
	<topTag :m="m.topTagModel" />
	<h1>Demo</h1>
	<p><i>~ demo tag ~</i></p>
	<p>
		<button @click="m.addRow">Add Row</button>
		<button @click="m.remove1">Remove Start</button>
		<button @click="m.remove2">Remove Middle</button>
		<button @click="m.remove3">Remove End</button>,
		Sort
		<button @click="m.sort1">Count ▲</button>
		<button @click="m.sort2">Count ▼</button>
		<button @click="m.sort3">Note ▲</button>
		<button @click="m.sort4">Note ▼</button>
	</p>
	<rowTag v-for="(n, index) in m.a" :key="n.id" :m="n" :i="index"></rowTag>
</div>
`,
make() {
var empty = {
	topTagModel: topTag.make(),
	a: [], addRow: noop,
	remove1: noop, remove2: noop, remove3: noop,
	sort1: noop, sort2: noop, sort3: noop, sort4: noop
};
try {

	var m = {
		topTagModel: topTag.make(),
		a: [],
		addRow()  { m.a.push(rowTag.make(m, "")); },
		remove1() { m.a.splice(0, 1); },
		remove2() { m.a.splice(m.a.length / 2, 1); },
		remove3() { m.a.splice(m.a.length - 1, 1); },
		sort1() { m.a.sort(function(a, b) { return a.count - b.count;            }); },
		sort2() { m.a.sort(function(a, b) { return b.count - a.count;            }); },
		sort3() { m.a.sort(function(a, b) { return a.note.localeCompare(b.note); }); },
		sort4() { m.a.sort(function(a, b) { return b.note.localeCompare(a.note); }); },
	};
	return m;

} catch (e) { logError("demoTag make", {e}); return empty; }
}
});

var rowTag = registerComponent({
name: "rowTag",
props: ["m", "i"],
template: `
<div>
	index{{ i }}:
	Row {{ m.id }},
	Count {{ m.count }} <button @click="m.increment">Increment</button>,
	Note <input type="text" v-model="m.note" @input="m.noteInput" placeholder="~ write here ~" /> len{{ m.note.length }},
	<button @click="m.remove(i)">Remove</button>
</div>
`,
make(up, message) {
var empty = { up: up, id: idn(), count: 0, note: "", increment: noop, remove: noop, noteInput: noop };
try {

	var m = {
		up: up,
		id: idn(),

		count: 0,
		note: message,
		increment() { m.count++; },
		remove(i) { m.up.a.splice(i, 1); },
		noteInput() { /*log("note input: " + m.note);*/ }
	};
	return m;

} catch (e) { logError("rowTag make", {e}); return empty; }
}
});

exporty({demoPage, demoTag, rowTag});





















//   ____           _     _     _     _   
//  |  _ \ ___  ___| |_  | |   (_)___| |_ 
//  | |_) / _ \/ __| __| | |   | / __| __|
//  |  __/ (_) \__ \ |_  | |___| \__ \ |_ 
//  |_|   \___/|___/\__| |_____|_|___/\__|
//                                        

var listPage = registerComponent({
name: "listPage",
template: `<div><listTag :m="m" /></div>`,
watch: { $route(to, from) { this.m = listTag.make(); } },
data() { keepPageData(this); return { m: listTag.make(), remake() { this.m = listTag.make(); } } }
});
var listTag = registerComponent({
name: "listTag",
props: ["m"],
template: `
<div>
	<topTag :m="m.topTagModel" />
	<p v-if="m.showPosts && m.ours">
		Showing your posts.
		Also check out the <router-link :to="m.targetFollow">blogs you follow</router-link>.
	</p>
	<p v-if="m.showPosts && !m.ours">
		Showing <i>{{ m.title }}</i>'s posts.
		Also check out the <router-link :to="m.targetFollow">blogs <i>{{ m.title }}</i> follows</router-link>.
	</p>
	<p v-if="m.showFeed && m.ours">
		Showing your feed,
		including <router-link :to="m.targetPosts">your posts</router-link>
		and posts from <router-link :to="m.targetFollow">blogs you follow</router-link>.
	</p>
	<p v-if="m.showFeed && !m.ours">
		Showing <i>{{ m.title }}</i>'s feed,
		including <router-link :to="m.targetPosts"><i>{{ m.title }}</i>'s posts</router-link>
		and posts from <router-link :to="m.targetFollow">blogs <i>{{ m.title }}</i> follows</router-link>.
	</p>
	<p>
		<span v-if="!m.countNewer" class="ghost">{{ m.labelNewer }}</span><router-link v-if="m.countNewer" :to="m.routeNewer" class="ghost">{{ m.labelNewer }}</router-link>{{ m.linkSeparator }}
		<span v-if="!m.countOlder" class="ghost">{{ m.labelOlder }}</span><router-link v-if="m.countOlder" :to="m.routeOlder" class="ghost">{{ m.labelOlder }}</router-link>
	</p>
	<postTag v-for="(n, index) in m.a" :key="n.key" :m="n" :i="index"></postTag>
	<p>
		<span v-if="!m.countNewer" class="ghost">{{ m.labelNewer }}</span><router-link v-if="m.countNewer" :to="m.routeNewer" class="ghost">{{ m.labelNewer }}</router-link>{{ m.linkSeparator }}
		<span v-if="!m.countOlder" class="ghost">{{ m.labelOlder }}</span><router-link v-if="m.countOlder" :to="m.routeOlder" class="ghost">{{ m.labelOlder }}</router-link>
	</p>
</div>
`,
make() {
var empty = {
	topTagModel: topTag.make(), gatherTagModel: gatherTag.make(),
	ours: false, showPosts: false, showFeed: false,
	title: "",
	targetPosts: "", targetFollow: "",
	countNewer: 0, countOlder: 0,
	labelNewer: "", labelOlder: "",
	routeNewer: "", routeOlder: "",
	linkSeparator: "",
	a: []
};
try {
	var m = {};
	m.topTagModel = topTag.make();
	m.gatherTagModel = gatherTag.make();

	var s = getRouteSegments();//split the route that led us here into segments
	var postsPerPage = validPostsPerPage(store.settings.header.reader.postsPerPage);//customizable in settings

	//the end of the route might have an action, like "~~andfollow" or "~~andlike.somepostid"
	if (hasText(s.action)) {
		log("found action", action);
	}

	//compose a line of text for the top of the page that attempts to explain what the hell is going on
	m.ours = isEditable() && s.hash2 == hash1();
	m.showPosts = s.s3 == "posts";
	m.showFeed = s.s3 == "feed";
	m.title = lookupTitle(s.hash2).short;
	m.targetPosts  = `/${brand}/${lookupTitle(s.hash2).full}/posts`;
	m.targetFollow = `/${brand}/${lookupTitle(s.hash2).full}/follows`;

	//show most recent posts
	if ((s.s3 == "posts" || s.s3 == "feed") && s.s4 == "") {//blank to show recent posts

		var f = listFilter(store.ticks.a, r => messageFilter(r, s)); if (!f.length) return empty;//filter
		var p = paginateRecent(f, postsPerPage);//paginate
		m.a = listMake(f, p.indexC, p.indexD, s);//render

		m.countNewer = p.postsNewer;//link
		m.countOlder = p.postsOlder;
		m.labelNewer = "";
		m.linkSeparator = "";
		m.labelOlder = things(p.pagesOlder, "Page")+" with "+things(p.postsOlder, "Older Post")+" >";
		m.routeNewer = "";
		m.routeOlder = p.hasEF ? `/${brand}/${lookupTitle(s.hash2).full}/${s.s3}/page/${p.tickE}-${p.tickF}` : "";

		m.labelPage = "most recent posts";

	//show a page of posts between two tick counts
	} else if ((s.s3 == "posts" || s.s3 == "feed") && s.s4 == "page") {

		var c = cut(s.s5, "-");//check
		var tickC = toIntCheck(c.before, 0);
		var tickD = toIntCheck(c.after, 0);

		var f = listFilter(store.ticks.a, r => messageFilter(r, s)); if (!f.length) return empty;//filter
		var p = paginateRange(f, postsPerPage, tickC, tickD);//paginate
		m.a = listMake(f, p.indexC, p.indexD, s);//render

		m.countNewer = p.postsNewer;//link
		m.countOlder = p.postsOlder;
		m.labelNewer = "< "+things(p.pagesNewer, "Page")+" with "+things(p.postsNewer, "Newer Post");
		m.linkSeparator = " - ";
		m.labelOlder = things(p.pagesOlder, "Page")+" with "+things(p.postsOlder, "Older Post")+" >";
		m.routeNewer = p.hasAB ? `/${brand}/${lookupTitle(s.hash2).full}/${s.s3}/page/${p.tickA}-${p.tickB}` : "";
		m.routeOlder = p.hasEF ? `/${brand}/${lookupTitle(s.hash2).full}/${s.s3}/page/${p.tickE}-${p.tickF}` : "";

		m.labelPage = "tick range of posts";

	//show a single post
	} else if ((s.s3 == "posts" || s.s3 == "feed") && s.s4 == "post") {

		checkText(s.s5);//check

		var f = listFilter(store.ticks.a, r => messageFilter(r, s)); if (!f.length) return empty;//filter
		var i = listFind(f, r => r.uid == s.s5);                     if (i == -1)   return empty;//find
		m.a = listMake(f, i, i, s);//render

		m.countNewer = i;//link
		m.countOlder = f.length - i - 1;
		m.labelNewer = "< "+things(m.countNewer, "Newer Post");
		m.linkSeparator = " - ";
		m.labelOlder = things(m.countOlder, "Older Post")+" >";
		m.routeNewer = (i > 0)            ? `/${brand}/${lookupTitle(s.hash2).full}/${s.s3}/post/${f[i - 1].uid}` : "";
		m.routeOlder = (i < f.length - 1) ? `/${brand}/${lookupTitle(s.hash2).full}/${s.s3}/post/${f[i + 1].uid}` : "";

		m.labelPage = "single post";

	} else { return empty; }
	//TODO here's where you would list all the posts liked by a blog, identified with a tag, and more stuff like that

	return m;

} catch (e) { logError("listTag make", {e}); return empty; }
}
});

//a single post
var postTag = registerComponent({
name: "postTag",
props: ["m", "i"],
template: `
<div>
	<p>
		<router-link :to="m.targetPost">post {{ m.labelPost }}</router-link>
		<router-link :to="m.targetAuthor">by <i>{{ m.labelAuthor }}</i></router-link>
		<span class="leafy" v-if="m.showFollow" @click="m.clickFollow">{{ m.labelFollow }}</span>
		<span v-if="m.showUnfollowConfirm">Stop following <i>{{ m.labelAuthor }}</i>?
			<span class="leafy" @click="m.clickUnfollowCancel">No.</span>
			<span class="flame" @click="m.clickUnfollowConfirmed">Yes, unfollow.</span>
		</span>
		<router-link class="leafy" v-if="m.showEdit" :to="m.targetEdit">Edit</router-link>
	</p>
	<div>{{ m.body }}</div>
</div>
`,
make(r, s) {
var empty = {
	key: "",
	targetPost: "", targetAuthor: "", targetEdit: "",
	labelPost: "", labelAuthor: "", labelFollow: "",
	showFollow: false, showUnfollowConfirm: false, showEdit: false,
	clickFollow: noop, clickUnfollowCancel: noop, clickUnfollowConfirmed: noop,
	date: "", title: "", body: ""
};
try {
	var m = {};
	m.key = r.uid;

	//permalink
	m.targetPost = `/${brand}/${lookupTitle(s.hash2).full}/${s.s3}/post/${r.uid}`;
	m.labelPost = sayDatePageShort(r.tick);

	//edit
	m.showEdit = isEditable() && r.source == hash1();//running editable and this post authored by us
	m.targetEdit = `/${brand}/${lookupTitle(s.hash2).full}/edit/${r.uid}`;

	//all the post author's posts
	m.labelAuthor = lookupTitle(r.source).short;
	m.targetAuthor = `/${brand}/${lookupTitle(r.source).full}/posts`;

	m.showFollow = false;
	m.showUnfollowConfirm = false;
	m.labelFollow = "";
	m.clickFollow = noop;
	m.clickUnfollowCancel = noop;
	m.clickUnfollowConfirmed = noop;

	//follow
	if (isEditable() && r.source != hash1()) {//running our installation looking at someone else's post
		//show Follow/Unfollow
		//click edits settings directly
		m.showFollow = true;
		if (store.settings.follows[r.source]) {
			m.labelFollow = "Following";
			m.clickFollow = function() { m.showUnfollowConfirm = true; };
			m.clickUnfollowCancel = function() { m.showUnfollowConfirm = false; };
			m.clickUnfollowConfirmed = directUnfollow;
		} else {
			m.labelFollow = "Follow";
			m.clickFollow = directFollow;
		}
	} else if (isBeaker() && !isEditable()) {//beaker browsed to someone else's installation, so we can do an install, but can't know if the author of this post is someone we already follow or even us
		//show Follow
		//click does install and redirect
		m.showFollow = true;
		m.labelFollow = "Follow";
		m.clickFollow = linkFollow;
	}

	async function directFollow() {
		addFollow(r.source);
		remake();
	}
	async function directUnfollow() {
		removeFollow(r.source);
		remake();
	}
	async function linkFollow() {
		var r = await findOrMakeInstallDrive();
		if (r.driveHash) navigateBrowser(`${driveHashToHyperUrl(r.driveHash)}#${getRouteSegments().path}~~andfollow`);
	}

	m.date = sayDatePageLong(r.tick);
	m.title = r.message.header.title;
	var body = linesToString(r.message.bodyLines);
	m.body = body;
	//TODO here's where you would do markdownToHTML, you think


	return m;
} catch (e) { logError("postTag make", {e}); return empty; }
}
});

exporty({listPage, listTag, postTag});


//a new list with just the messages in list that the given function says true to
function listFilter(l, filterFunction) {
	var filtered = [];
	l.forEach(r => { if (filterFunction(r)) filtered.push(r); });
	return filtered;
}

//true if we should include this message in the list we're going to let the user click through
function messageFilter(r, s) {

	if (r.message.header.type == "post") {//the message we're looking at describes a post
		if (s.hash2 == r.message.header.source) {//the route is navigated to the author of this post
			return true;
		} else if (s.s3 == "feed" &&//we're preapring a feed, so also include posts by blogs this one follows, and
			getSettings(s.hash2).follows[r.message.header.source]) {//this blog follows the source of this message
			return true;
		} else {
			return false;
		}
	} else {//the message we're looking at is something else
		return false;//exclude for now
	}
	//TODO much more to do here later for reposts, likes, and notes
}

//index of the first item in list that the given function says true to
function listFind(f, findFunction) {
	for (var i = 0; i < f.length; i++) { if (findFunction(f[i])) return i; }
	return -1;//not found, your function hated everything
}

//given an array of messages f, render vue components for indices p through q
function listMake(f, p, q, s) {
	var rendered = [];
	for (var i = p; i <= q; i++) rendered.push(postTag.make(f[i], s));
	return rendered;
}































//  __        __    _ _                         _   _____    _ _ _   
//  \ \      / / __(_) |_ ___    __ _ _ __   __| | | ____|__| (_) |_ 
//   \ \ /\ / / '__| | __/ _ \  / _` | '_ \ / _` | |  _| / _` | | __|
//    \ V  V /| |  | | ||  __/ | (_| | | | | (_| | | |__| (_| | | |_ 
//     \_/\_/ |_|  |_|\__\___|  \__,_|_| |_|\__,_| |_____\__,_|_|\__|
//                                                                   

var editPage = registerComponent({
name: "editPage",
template: `<editTag :m="m" />`,
watch: { $route(to, from) { this.m = editTag.make(); } },
data() { keepPageData(this); return { m: editTag.make(), remake() { this.m = editTag.make(); } } }
});

var editTag = registerComponent({
name: "editTag",
props: ["m"],
template: `
<div>
	<topTag :m="m.topTagModel" />
	<p><textarea v-model="m.body" :placeholder="m.prompt"></textarea></p>
	<div>
		<button :disabled="!m.enableSave" @click="m.save">Save</button>
		<span v-if="m.showDelete">
			<button @click="m.delete">Delete</button>
			<span v-if="m.showDeleteConfirm">Are you sure?
				<span class="leafy" @click="m.deleteCancel">No, nevermind.</span>
				<span class="flame" @click="m.buttonDelete">Yes, I'm sure, Delete.</span>
			</span>
		</span>
	</div>
</div>
`,
make() {
var empty = {
	topTagModel: topTag.make(), prompt: "",
	enableSave: false,
	title: "", body: "",
	save: noop,
	showDelete: false, delete: noop,
	showDeleteConfirm: false, deleteCancel: noop, buttonDelete: noop,
	snippet: noop,
};
try {
	var m = {};
	m.topTagModel = topTag.make();

	//get information from the address bar
	var s = getRouteSegments();

	var post;
	if (hasText(s.params.segmentPost)) post = store.uids[s.params.segmentPost];

	m.title = "";
	m.body = "";

	m.showDelete = false;
	m.showDeleteConfirm = false;

	//write a new post
	if (s.s3 == "write") {

		m.prompt = "Your message to hyperspace";
		m.enableSave = isEditable();
		m.save = buttonSave;

	//edit an existing post that's in the store
	} else if (s.s3 == "edit" && post) {

		m.prompt = "";
		m.enableSave = isEditable();
		m.save = buttonEdit;

		m.title = validNote(post.message.header.title);
		m.body = linesToString(post.message.bodyLines);
		m.showDelete = true;

	//we're being asked to edit a post that's not in the store yet
	} else if (s.s3 == "edit") {

		m.prompt = "Searching for this post to edit...";
		m.enableSave = false;
		m.save = noop;

		log("asked to edit, but not in store yet");

	//neither write nor edit
	} else { return empty; }

	async function buttonSave() {
		var uid = await editSave(m.title, m.body);
		editRoute(`/${brand}/${lookupTitle(hash1()).full}/edit/${uid}`);//make it so back goes to edit
		navigateRoute(`/${brand}/${lookupTitle(hash1()).full}/posts/post/${uid}`);//and show rendered
	}
	async function buttonEdit() {
		await editEdit(m.title, m.body, post);
		navigateRoute(`/${brand}/${lookupTitle(hash1()).full}/posts/post/${s.params.segmentPost}`);//show rendered
	}

	m.delete = function() { m.showDeleteConfirm = true; };
	m.deleteCancel = function() { m.showDeleteConfirm = false; }
	m.buttonDelete = async function() {
		await editDelete(post);
		editRoute(`/${brand}/${lookupTitle(hash1()).full}/write`);//change where we are now to write
		navigateRoute(`/${brand}/${lookupTitle(hash1()).full}/${isEditable() ? "feed" : "posts"}`);//and go home, so back goes back to write instead to editing a post that doesn't exist anymore
	}

	m.snippet = async function() {
		log("write snippet");
	};

	return m;
} catch (e) { logError("editTag make", {e}); return empty; }
}
});

exporty({editPage, editTag});

//save a new post from the information the user wrote in the form
async function editSave(title, areaBlock) {

	title = validNote(title);//step1: prepare text
	var bodyLines = areaBlockToBodyLines(areaBlock);

	var header = {};//step2: create header
	header.type = "post";
	header.source = hash1();

	if (hasText(title)) header.title = title;//step3: set title

	var t = now();//step4: set time and choose unique post identifier
	header.date = sayDateDataLong(t);
	header.uid = "p"+start(header.source, 8)+"-"+sayDateDataShort(t)+"-"+randomBase16(8);

	var message = createMessage(header, bodyLines);//step5: create message

	var fileBlock = messagesToFileBlock([message]);//step6: save message in a file in the hyperdrive here
	var path = "hyper://"+header.source+"/posts/"+header.uid+".js";
	await writeFile(path, fileBlock);

	messageFromRunningPage(message);//step7: add message to store
	return header.uid;//step8: return the identifier we chose
}
//edit and existing post with an edited title and body text
async function editEdit(title, areaBlock, post) {//note we do not (and could not easily) change the tick or uid

	title = validNote(title);//step1: prepare edited text
	var bodyLines = areaBlockToBodyLines(areaBlock);

	delete post.message.header.title;//step3: set title, edit the object right in the store
	if (hasText(title)) post.message.header.title = title;

	post.message = createMessage(post.message.header, bodyLines);//step5: remake the message in the store

	var fileBlock = messagesToFileBlock([post.message]);//step6: overwrite the message's file in the hyperdrive here
	var path = "hyper://"+post.message.header.source+"/posts/"+post.message.header.uid+".js";
	await writeFile(path, fileBlock);//will overwrite and we want it to
}
//delete the post from the disk and store
async function editDelete(post) {

	//delete post from store.ticks
	function findInStoreTicksByUid(uid) {
		for (var i = 0; i < store.ticks.a.length; i++) {//not the fastest, but ok because delete should be uncommon
			if (store.ticks.a[i].message.header.uid == uid) return i;
		}
		toss("can't find post uid to delete", {post, uid});
	}
	var i = findInStoreTicksByUid(post.message.header.uid);//find the index where post appears in store.ticks.a
	store.ticks.a.splice(i, 1);//we're editing the array inside a SortedArray directly, but should be ok?

	//delete post from store.uids
	if (!store.uids[post.message.header.uid]) toss("cant find post to delete in store.uids", {post, i});
	delete store.uids[post.message.header.uid];
	//TODO so that's all pretty cavalier; and while you think that's all of it now, what about after media, likes and tags?
	//instead, you could refresh the whole page, or blank the whole store and rebuild it from gather

	var path = "hyper://"+post.message.header.source+"/posts/"+post.message.header.uid+".js";
	await deleteFile(path);
}

//takes text the user wrote in the body text area
//turns it into nicely formatted lines for the message body in the post js file
//unlike formatProse, this won't mess up markdown and is safe to run automatically
function areaBlockToBodyLines(areaBlock) {
	var areaLines = stringToLines(areaBlock);
	var lines = [];
	areaLines.forEach(areaLine => lines.push(onlyTabsAndSpaces(unfancy(areaLine)).trimEnd()));
	return condenseBlankLines(lines);
}



























//      _    _                 _   
//     / \  | |__   ___  _   _| |_ 
//    / _ \ | '_ \ / _ \| | | | __|
//   / ___ \| |_) | (_) | |_| | |_ 
//  /_/   \_\_.__/ \___/ \__,_|\__|
//                                 

var aboutPage = registerComponent({
name: "aboutPage",
template: `<aboutTag :m="m" />`,
watch: { $route(to, from) { this.m = aboutTag.make(); } },
data() { keepPageData(this); return { m: aboutTag.make(), remake() { this.m = aboutTag.make(); } } }
});
var aboutTag = registerComponent({
name: "aboutTag",
props: ["m"],
template: `
<div>
	<topTag :m="m.topTagModel" />
	<h1>About</h1>
	<p><i>~ about tag ~</i></p>
	<p>about, install, upgrade, export, and logs</p>
</div>
`,
make() {
var empty = {
	topTagModel: topTag.make(),
};
try {
	var m = {};
	m.topTagModel = topTag.make();

	return m;
} catch (e) { logError("aboutTag make", {e}); return empty; }
}
});
exporty({aboutPage, aboutTag});

var systemPage = registerComponent({
name: "systemPage",
template: `<systemTag :m="m" />`,
watch: { $route(to, from) { this.m = systemTag.make(); } },
data() { keepPageData(this); return { m: systemTag.make(), remake() { this.m = systemTag.make(); } } }
});

var systemTag = registerComponent({
name: "systemTag",
props: ["m"],
template: `
<div>
	<topTag :m="m.topTagModel" />
	<h1>System</h1>
	<p><i>~ system tag ~</i></p>
	<gatherTag :m="m.gatherTagModel" />
</div>
`,
make() {
var empty = {
	topTagModel: topTag.make(),
	gatherTagModel: gatherTag.make(),
};
try {
	var m = {};
	m.topTagModel = topTag.make();
	m.gatherTagModel = gatherTag.make();

	return m;
} catch (e) { logError("systemTag make", {e}); return empty; }
}
});

exporty({systemPage, systemTag});

































//   _____     _ _               
//  |  ___|__ | | | _____      __
//  | |_ / _ \| | |/ _ \ \ /\ / /
//  |  _| (_) | | | (_) \ V  V / 
//  |_|  \___/|_|_|\___/ \_/\_/  
//                               

var followsPage = registerComponent({
name: "followsPage",
template: `<followsTag :m="m" />`,
watch: { $route(to, from) { this.m = followsTag.make(); } },
data() { keepPageData(this); return { m: followsTag.make(), remake() { this.m = followsTag.make(); } } }
});

var followsTag = registerComponent({
name: "followsTag",
props: ["m"],
template: `
<div>
	<topTag :m="m.topTagModel" />
	<p><router-link :to="m.target"><i>{{ m.title }}</i></router-link> follows {{ m.count }}:</p>
	<followsRowTag v-for="(n, index) in m.a" :key="n.id" :m="n" :i="index"></followsRowTag>
</div>
`,
make() {
var empty = {
	topTagModel: topTag.make(),
	target: "", title: "", count: "",
	a: []
};
try {
	var m = {};
	m.topTagModel = topTag.make();

	var s = getRouteSegments();
	var follows = getSettings(s.hash2).follows;

	m.target = `/${brand}/${lookupTitle(s.hash2).full}/posts`;
	m.title = lookupTitle(s.hash2).short;

	m.a = [];
	for (var hashF in follows) { m.a.push(followsRowTag.make(s, hashF)); }//the object keys are the hashes the blog follows
	m.count = things(m.a.length, "blog");

	return m;
} catch (e) { logError("followsTag make", {e}); return empty; }
}
});

var followsRowTag = registerComponent({
name: "followsRowTag",
props: ["m", "i"],//model object and current 0+ index that vue changes to tell us the current row number
template: `
<p>
	<router-link :to="m.targetPosts"><i>{{ m.title }}</i>'s posts</router-link>
	<router-link :to="m.targetFollows">and the blogs they follow</router-link>
	<span v-if="m.ours" class="leafy" @click="m.clickRemove">Remove</span>
	<span v-if="m.showRemoveConfirm">Stop following <i>{{ m.title }}</i>?
		<span class="leafy" @click="m.clickRemoveCancel">No.</span>
		<span class="flame" @click="m.clickRemoveConfirmed">Yes, unfollow.</span>
	</span>
</p>
`,
make(s, hashF) {
var empty = {
	id: idn(),//so even in an error state, the ids are still unique
	ours: false,
	title: "",
	targetPosts: noop, targetFollows: noop,
	showRemoveConfirm: false, clickRemove: noop, clickRemoveCancel: noop, clickRemoveConfirmed: noop
};
try {
	var m = {};
	m.ours = isEditable() && s.hash2 == hash1();

	m.id = hashF;//will be unique on the page

	m.title = lookupTitle(hashF).short;
	m.targetPosts   = `/${brand}/${lookupTitle(hashF).full}/posts`;
	m.targetFollows = `/${brand}/${lookupTitle(hashF).full}/follows`;

	m.showRemoveConfirm = false;
	m.clickRemove = function() { m.showRemoveConfirm = true; };
	m.clickRemoveCancel = function() { m.showRemoveConfirm = false; }
	m.clickRemoveConfirmed = async function() {
		removeFollow(hashF);
		remake();//update the page to reflect our current list of blogs the blog of this installation follows
	}

	return m;
} catch (e) { logError("followsRowTag make", {e}); return empty; }
}
});

exporty({followsPage, followsTag, followsRowTag});


async function addFollow(h) {
	removeFromArray(store.settings.header.follows, h);//remove it in case it's somehow already there, even somehow multiple times
	store.settings.header.follows.push(h);//add the given hash to the list we follow in settings
	await saveSettings();//save settings to disk ... hyperdrive, i mean
}
async function removeFollow(h) {
	removeFromArray(store.settings.header.follows, h);
	await saveSettings();
}
function removeFromArray(a, e) {
	for (var i = a.length - 1; i >= 0; i--) {//loop backwards so removing doesn't change index
		if (a[i] == e) {//found a match
			a.splice(i, 1);//remove from the array
		}
	}
}









var followTag = registerComponent({
name: "followTag",
props: ["m"],
template: `
<div>
	<p><i>~ follow tag ~</i></p>
	<button @click="m.clickFollow">{{ m.textFollow }}</button>
	<div>
		{{ m.message }}
	</div>
</div>
`,
make() {
var empty = {
	textFollow: "", clickFollow: noop,
};
try {
	var m = {};

	var b;

	m.textFollow = "Follow Me";
	m.clickFollow = function() {
		m.textFollow = "Following. Thanks!";
	};

	return m;
} catch (e) { logError("followTag make", {e}); return empty; }
}
});
exporty({followTag});









































//   _____ _ _      
//  |  ___(_) | ___ 
//  | |_  | | |/ _ \
//  |  _| | | |  __/
//  |_|   |_|_|\___|
//                  

async function readFile(path)                { return await beaker.hyperdrive.readFile(path); }
async function writeFile(path, s)            { return await beaker.hyperdrive.writeFile(path, s); }
async function copyFile(source, destination) { return await beaker.hyperdrive.copy(source, destination); }
async function deleteFile(path)              { return await beaker.hyperdrive.unlink(path); }
async function makeFolder(path)              { return await beaker.hyperdrive.mkdir(path); }//can so several deep
async function deleteFolder(path)            { return await beaker.hyperdrive.rmdir(path); }

//specify drive like "hyper://714e...5ebf" and path like "/folder/*"
async function listFolder(drive, path) { return await beaker.hyperdrive.query({drive, path}); }

//look at a path to see if it's a folder, file, or not found
async function lookPath(path) {

	var info;
	try {
		info = await beaker.hyperdrive.stat(path);
	} catch (e) {
		if (has(e+"", "NotFoundError")) return {isNotFound: true, exception: e};
		else                            return {isError:    true, exception: e};
	}

	if      (info && info.isFile())      { return {isFile:   true, size: info.size, info}; }
	else if (info && info.isDirectory()) { return {isFolder: true,                  info}; }
	else                                 { return {isError:  true                       }; }
}

exporty({readFile, writeFile, copyFile, deleteFile, makeFolder, deleteFolder});
exporty({listFolder, lookPath});

function fileCount(path) {
//return the number of files, folders, and bytes
}



























//   ____       _   _   _                                   _   ___           _        _ _ 
//  / ___|  ___| |_| |_(_)_ __   __ _ ___    __ _ _ __   __| | |_ _|_ __  ___| |_ __ _| | |
//  \___ \ / _ \ __| __| | '_ \ / _` / __|  / _` | '_ \ / _` |  | || '_ \/ __| __/ _` | | |
//   ___) |  __/ |_| |_| | | | | (_| \__ \ | (_| | | | | (_| |  | || | | \__ \ || (_| | | |
//  |____/ \___|\__|\__|_|_| |_|\__, |___/  \__,_|_| |_|\__,_| |___|_| |_|___/\__\__,_|_|_|
//                              |___/                                                      

var settingsPage = registerComponent({
name: "settingsPage",
template: `<settingsTag :m="m" />`,
watch: { $route(to, from) { this.m = settingsTag.make(); } },
data() { keepPageData(this); return { m: settingsTag.make(), remake() { this.m = settingsTag.make(); } } }
});

var settingsTag = registerComponent({
name: "settingsTag",
props: ["m"],
template: `
<div>
	<topTag :m="m.topTagModel" />
	<h2>Blog Settings</h2>
	<p>Title: <input type="text" v-model="m.title" @input="m.titleOnInput" /> "<i>{{ m.titlePreview }}</i>"</p>
	<p>Description: <input type="text" v-model="m.description" /></p>
	<h2>Reader Settings</h2>
	<p>Show <input type="text" v-model="m.postsPerPage" /> posts on a page.</p>
	<p><button :disabled="!m.editable" @click="m.save">Save</button></p>
</div>
`,
make() {
var empty = {
	topTagModel: topTag.make(),
	editable: false,
	title: "", titleOnInput: noop, titlePreview: "",
	description: "",
	postsPerPage: 1,
	save: noop, snippet: noop
};
try {
	var m = {};
	m.topTagModel = topTag.make();

	//editable
	m.editable = isEditable();//save buttons available in beaker on our installation

	//title and description
	m.title = lookupTitle(hash1()).title;
	m.titlePreview = lookupTitle(hash1()).short;
	m.titleOnInput = function() { m.titlePreview = composeTitle(m.title, hash1()).short; }
	m.description = textOrBlank(store.settings.header.description);

	//reader
	m.postsPerPage = validPostsPerPage(store.settings.header.reader.postsPerPage)+"";

	m.save = async function() {

		//title and description
		var titleChanged = false;
		if (store.settings.header.title != validName(m.title)) {
			titleChanged = true;
			store.settings.header.title = validName(m.title);
		}
		m.description = validNote(m.description);
		store.settings.header.description = validNote(m.description);

		//reader
		m.postsPerPage = validPostsPerPage(m.postsPerPage)+"";
		store.settings.header.reader.postsPerPage = validPostsPerPage(m.postsPerPage);

		await saveSettings();
		if (lookupTitle(hash1()).full != getRouteSegments().s2) {
			editRoute(`/${brand}/${lookupTitle(hash1()).full}/settings`);//in case the title changed
		}
	}

	m.snippet = async function() {
		log("settings snippet");
	};

	return m;
} catch (e) { logError("settingsTag make", {e}); return empty; }
}
});

var installTag = registerComponent({
name: "installTag",
props: ["m"],
template: `
<div v-if="m.show">
	<p>
		<router-link :to="m.target"><i>{{ m.title }}</i></router-link> is blogging with {{ m.brand }}.
		Follow them, and post yourself, with <span class="leafy" @click="m.install">your own copy of the app</span>.
	</p>
</div>
`,
make() {
var empty = { show: false, brand: "", target: "", title: "", install: noop };
try {
	if (!(isBeaker() && !isEditable())) return empty;//in beaker navigated to someone else's blog, show the install bar

	var m = {};
	m.show = true;

	m.brand = brand;
	m.title = lookupTitle(hash1()).short;//the title~00ff00 of the installation that's running, not the posts it's showing
	m.target = `/${brand}/${lookupTitle(hash1()).full}/posts`;

	m.install = async function() {//find an existing installation, or make a new one
		var r = await findOrMakeInstallDrive();
		if (r.driveHash) navigateBrowser(driveHashToHyperUrl(r.driveHash)+"#"+getRouteSegments().path);
	}

	return m;
} catch (e) { logError("installTag make", {e}); return empty; }
}
});

var titleTag = registerComponent({
name: "titleTag",
props: ["m"],
template: `
<p v-if="m.show">
	Thanks for getting {{ m.brand }}!
	Title your blog "<i>{{ m.preview }}</i>" for follows and posts:
	<input type="text" v-model="m.title" @input="m.input" />
	<button @click="m.save">Save</button>
	You can change it later in <router-link :to="m.target">Settings</router-link>.
</p>
`,
make() {
var empty = { show: false, brand: "", title: "", input: noop, preview: "", save: noop, target: "" };
try {
	if (!(isEditable() && !hasText(lookupTitle(hash1()).title))) return empty;//continue if user can edit their title, and needs one

	var m = {};
	m.show = true;
	m.brand = brand;
	m.title = lookupTitle(hash1()).title;
	m.preview = lookupTitle(hash1()).short;
	m.input = function() { m.preview = composeTitle(m.title, hash1()).short; }
	m.save = async function() {
		store.settings.header.title = validName(m.title);
		await saveSettings();
		var s = getRouteSegments();
		if (hash1() == s.hash2 &&//our new installation is navigated to our own blog, and
			lookupTitle(hash1()).full != s.s2) {//the name in the address bar
			editRoute(`/${brand}/${lookupTitle(hash1()).full}/${s.s3all}`);
		}
		remake();
	}
	m.target = `/${brand}/${lookupTitle(hash1()).full}/settings`;

	return m;
} catch (e) { logError("titleTag make", {e}); return empty; }
}
});

exporty({settingsPage, settingsTag, installTag, titleTag});

//find an existing installation, or make a new one, returns .driveHash has text or .userDenied true
async function findOrMakeInstallDrive() {
	log("install start --")
	var found = await findInstallDrive();
	log("install found", found);
	if (found.noInstallation || found.userDenied) {//TODO hack get rid of the "or user denied" when beaker can reply no installation
		var made = await makeInstallDrive();
		log("install made", made);
		return made;//made driveHash or userDenied
	} else {
		return found;//found driveHash or userDenied
	}
}
//have the user choose an existing installation drive, returns .driveHash has text, .noInstallation true or .userDenied true
async function findInstallDrive() {
	if (false) return {noInstallation: true};
	try {

		var u = await beaker.shell.selectDriveDialog({ writable: true });
		return {driveHash: hyperUrlToDriveHash(u)};

	} catch (e) { if (has(e+"", "UserDeniedError")) return {userDenied: true}; else toss("selectDriveDialog rethrow", {e}); }
}
//copy the shrinkwrap drive to a new one this beaker can edit, returns .driveHash has text or .userDenied true
async function makeInstallDrive() {
	try {

		var d = await beaker.hyperdrive.forkDrive(
			"hyper://bd294375a0e877aa2993e87d5d4b5f834e70cd40f7714959654f737f89e841b8/",
			{ detached: true, prompt: false, title: "DLOG", description: "Your installed copy of the DLOG app" });
		return {driveHash: hyperUrlToDriveHash(d.url)};

	} catch (e) { if (has(e+"", "UserDeniedError")) return {userDenied: true}; else toss("forkDrive rethrow", {e}); }
}
exporty({findOrMakeInstallDrive, findInstallDrive, makeInstallDrive});




function validPostsPerPage(s) {
	var d = 42; var min = 1; var max = 256;//default, min and max values for target capacity posts per page
	var i = intOrZero(s);
	if (i < min) return d;
	if (i > max) return max;
	return i;
}
exporty({validPostsPerPage});























//    ____       _   _               
//   / ___| __ _| |_| |__   ___ _ __ 
//  | |  _ / _` | __| '_ \ / _ \ '__|
//  | |_| | (_| | |_| | | |  __/ |   
//   \____|\__,_|\__|_| |_|\___|_|   
//                                   

var gatherTag = registerComponent({
name: "gatherTag",
props: ["m"],
template: `
<div>
	<p>
		<i>~ gather tag ~</i>
		<button @click="m.gather">Gather</button>
		one line, drives gathering from, waiting on how many, times for start and most recent response, store size
	</p>
</div>
`,
make() {
var empty = { gather: noop };
try {
	var m = {};

	m.gather = noop;

//	m.gather = gather;//point to the big gather function

	return m;
} catch (e) { logError("gatherTag make", {e}); return empty; }
}
});

exporty({gatherTag});













//call strongly on startup hash1, navigate hash2
//call weakly on settings arrived
var _history = {};//hash1, and every hash2 this running instance has navigated to, to identify blogs we've visited
function simpleGather(h, strong) {
	if (typeof beaker == "undefined" || !hashLooksValid(h)) return;

	if (_history[h]) strong = true;//already in history
	if (strong) _history[h] = true;//strength now known from either history or this call
	stamp(`gather ${start(h, 6)}... ${strong ? "strong" : "weak"}`);

	_gatherSingle(h);//if weak, gather just h
	if (strong) {//if strong, also gather all the blogs h follows
		var follows = getSettings(h).follows;
		for (var hashF in follows) _gatherSingle(hashF);//the object keys are the hashes the blog follows
		//anchor
	}
}
var _gathered = {};//every drive hash we've started gathering from, to not do the same drive twice
function _gatherSingle(h) {
	if (typeof beaker == "undefined" || !hashLooksValid(h)) return;

	if (_gathered[h]) return;//already did this one

	_gathered[h] = true;//mark it done to avoid next time
	gatherA([h]);//no await, returns the promise immediately, and we throw it away! that's how bad we are!
	stamp(`gathered ${start(h, 6)}...`);
}
exporty({simpleGather});

function stamp(s) {
//	log(nowStamp() + " " + s);
//TODO uncomment to turn gather logging back on
}










//given an array of drives, call b on each
async function gatherA(drives) {
	try {

		drives.forEach(drive => {
			try {
				gatherB(drive);//call without await to start all the drives at the same time
			} catch (e) { logError("listing files on drive", {e, drive}); }
		});

	} catch (e) { logError("looping through drives", {e}); }
	stamp("A end");
}

//given a drive, list the files, then call c on each file
async function gatherB(drive) {

	var list = await delayQuery({ drive, path: ["/posts/*.js", "/settings.js"] });
	list.forEach(file => {
		try {
			gatherC(drive, file);//call without await to start all the files at the same time
		} catch (e) { logError("reading a file", {e, drive, file}); }
	});

	stamp("B end " + drive + " --------");
}

//given a file, read it and update the store
async function gatherC(drive, file) {

	if (file.type == "file" && file.stat && minInt(file.stat.size, 0) && file.stat.size < Size.mb) {

		var fileBlock = await delayRead(file.url);
		messagesFromFile(drive, fileBlock);

	} else {

		logError("skipping file", {drive, file});
	}

	stamp("C end " + file.url);
}




async function randomDelay() {
	var t = 0;
//	t = randomBetween(0, 1*Time.second);
//TODO here's where you can put back in a delay
	await delay(t);
}
function delay(t) {
	return new Promise(function(resolve) {
		setTimeout(resolve, t);
	});
}
//sloooooooooow down...
async function delayQuery(o) { await randomDelay(); return await beaker.hyperdrive.query(o);    }
async function delayRead(s)  { await randomDelay(); return await beaker.hyperdrive.readFile(s); }
exporty({stamp, randomDelay, delay, delayQuery, delayRead});






















//   ____  _                 
//  / ___|| |_ ___  _ __ ___ 
//  \___ \| __/ _ \| '__/ _ \
//   ___) | || (_) | | |  __/
//  |____/ \__\___/|_|  \___|
//                           

var store = {

	//what we're reading and who we are
	settings: {},//the settings of this dlog that's running, one we exported, someone else's we're navigated to on beaker, or our own

	//the world
	graph: {},//the social network, who follows who, what blogs are titled, which drives may have decorations for others, all that

	//trusted messages with a valid tick and unique uid, which can be about a post, repost, like, or note
	ticks: SortedArray((a, b) => b.tick - a.tick),//most recent tick first
	uids: {},//quick lookup by uid, used only to avoid duplicates on gathering again

	//links and attachments
	media: {},//attached files in posts
};
exporty({store});
//you want to be able to do if (store.folder1.key1) without crashing, so you have to make an empty object folder1, but don't have to make key1, just because of the way javascript works until maybe someday it gains a null propegation operator

/*
Here's the public interface to get messages into the store:

messages(stringBlock)               is called when we're running from exported.html, and stringBlock is from running the js file.
messagesFromFile(source, fileBlock) is called when we're running in beaker, and fileBlock is the contents of the js file.
messageFromRunningPage(message)     is called when the user writes a new post or note or likes something. We've tried to save the
message in a new file, too, and we'll get that file back on the next gather, but this puts it in the store right away.

Messages have the hyperdrive hash they came from in their headers, as message.header.source.
When we're exported, we trust the source in the message header is the drive it came from.
In beaker, we only let in messages that say they're from the drive we read them from.

In beaker, messages(stringBlock) does get called once at the very beginning when index.html script srcs settings.js
*/
function messages(stringBlock) {
	try {
		stringBlockToMessages(stringBlock).forEach(message => {
			try {
				var source = message.header.source;//when we're exported, trust that messages are from the drives they say they're from
				storeMessage(source, message);
			} catch (e) { logError("skipping bad message from export", {e, message}); }
		});
	} catch (e) { logError("skipping bad block from export", {e, stringBlock}); }
	remake();
}
function messagesFromFile(source, fileBlock) {
	try {
		fileBlockToMessages(fileBlock).forEach(message => {
			try {
				storeMessage(source, message);//when we're in beaker, don't trust that messages are from the drives they say they're from
			} catch (e) { logError("skipping bad message from drive", {e, source, message}); }
		});
	} catch (e) { logError("skipping bad block from drive", {e, fileBlock}); }
	remake();
}
function messageFromRunningPage(message) {
	try {
		var source = message.header.source;//when this page did it, trust the source is authentic
		storeMessage(source, message);//when we're in beaker, don't trust that messages are from the drives they say they're from
	} catch (e) { logError("skipping bad message from the running page", {e, source, message}); }
	remake();
}
exporty({messages, messagesFromFile, messageFromRunningPage});

/*
that's it for the public interface
what follows is iron-plated functions to sort, validate, and import messages into the store
*/

function storeMessage(source, message) {

	//check
	if (!hashLooksValid(source)) toss("skipping message, invalid source", {source, message});
	if (source != message.header.source) toss("skipping message, forged source", {source, message});

	//sort
	var type = message.header.type;
	if (type == "settings") {

		storeMessageSettings(source, message);//read our and everybody else's settings to build our map of the social graph of follows and decorations

	} else if (type == "post" || type == "repost" || type == "like" || type == "note") {

		storeMessagePostRepostLikeOrNote(source, message);//a post, repost, like, or note must have a valid tick and unique uid

	} else {

		toss("skipping message, unknown type", {source, message});
	}
}

function storeMessageSettings(source, message) {

	//add empty arrays and objects if arrays and objcts are missing, and make a valid and unique copy of the follows list
	fillSettings(message);

	//in beaker or exported, the first message we get the settings from this copy of dlog, ours, someone else's we're reading, or one we exported
	if (!store.settings.header) store.settings = message;
	else store.graph[source] = message;//after that, save everyone else's settings in store.graph

	simpleGather(source, false);//gather weak from arrived settings
}

function storeMessagePostRepostLikeOrNote(source, message) {

	//get the post's unique identifier
	var uid = message.header.uid;
	if (badText(uid)) toss("no post uid", {source, message, uid});
	if (clip(message.header.source, 0, 8) != clip(uid, 1, 8)) toss("post uid must include valid source", {source, message});

	//get the post's time and date
	var tick = toIntCheck(cut(message.header.date, " ").before, 0);//no posts from the 1960s, but don't worry, it all happened in the early 70s anyway

	//skip duplicates, which will happen in huge number as we gather again
	if (store.uids[uid]) { log("skipping duplicate post uid"); return; }//return is faster than toss because there's no call stack

	//make and add a new record for this post
	var r = { uid, tick, source, message };
	store.uids[uid] = r;
	store.ticks.add(r);//SortedList will use r.tick to quickly insert r in sorted order
}


function getSettings(hash) {
	if (hash == hash1())        return store.settings;//our settings
	else if (store.graph[hash]) return store.graph[hash];//settings we've gathered
	else return fillSettings();//an empty object you can check .whatever on without throwing
}

//make or add to a settings object with no information, but empty contained arrays and objects
//this makes it easy to safely search around until javascript gets the optional chaining operator
//also copies the follows array into a valid and unique follows object
function fillSettings(r) {
	if (!r) r = {};
	if (!r.header) r.header = {};

	//settings message header reader subsettings
	if (!r.header.reader)  r.header.reader = {};//reader settings, like how many posts per page

	//settings message header follows list
	if (!r.header.follows) r.header.follows = [];//follows list
	//validate and copy that into an object one level up
	r.follows = {};//clear a previous copy
	r.header.follows.forEach(e => {//copy the list into an object to make sure each contained hash is
		checkHash(e);//valid, and
		r.follows[e] = true;//unique, because javascript object keys are unique
	});
	return r;
}

exporty({getSettings, fillSettings});






























//   _                    _          _ 
//  | |    ___   __ _  __| | ___  __| |
//  | |   / _ \ / _` |/ _` |/ _ \/ _` |
//  | |__| (_) | (_| | (_| |  __/ (_| |
//  |_____\___/ \__,_|\__,_|\___|\__,_|
//                                     

//now that vue is rendered, do stuff specific to this app and beaker
async function loaded() {
	await installSettings();
	startRouter();
	log(brand + " loaded in " + (Date.now() - timeLaunched) + "ms 🎂");
	runTests();
	simpleGather(hash1(), true);//gather strong the running instance
}
exporty({loaded});

//create settings after install, run this once each time the page loads
async function installSettings() {
	if (!store.settings.header) {//settings.js isn't here, this happens on the first run after installation
		store.settings.header = {};
		store.settings.header.type = "settings";
		store.settings.header.source = hyperUrlToDriveHash(window.location.href);//take our drive hash from the address bar
		fillSettings(store.settings);
		await getEnvironment();
		await saveSettings();//create settings.js to load next time
	} else {
		fillSettings(store.settings);
		await getEnvironment();
	}
}
//to change settings, just change the contents of store.settings.header directly, and then call await saveSettings()
async function saveSettings() {
	fillSettings(store.settings);
	if (isEditable()) {//only do something if we're in beaker and running on a drive we can edit
		var path = driveHashToHyperUrl(hash1())+"settings.js";
		var block = objectToFileBlock(store.settings.header);
		await beaker.hyperdrive.writeFile(path, block);
	}
}
exporty({installSettings, saveSettings});

//call async getEnvironment() once at startup, and then non-async hash1(), isBeaker(), and isEditable() as many times as you want
async function getEnvironment() {
	if (_environment) toss("no, only call this once");

	//window location
	var w = window.location.href;
	var hashW;
	if (starts(w, "hyper://")) {
		hashW = parse(w, "hyper://", "/").middle;
		checkHash(hashW);//if we're navigated hyper, the window location must include a valid looking hyperdrive hash
	}

	//hash1 is always there from settings, and originally was set from window location
	var hash1 = store.settings.header.source;
	checkHash(hash1);

	//beaker
	var isBeaker = (typeof beaker != "undefined");

	//editable if in beaker, on hyper, window location and settings.js have the same valid hash, and that drive is writable
	var isEditable = (
		isBeaker &&
		hasText(hash1) && hasText(hashW) && (hash1 == hashW) &&
		(await beaker.hyperdrive.getInfo("hyper://"+hash1+"/")).writable
	);
	if (isEditable && (starts(hash1, "8419b15d") || starts(hash1, "2e3d5799"))) isEditable = false;
	//^^^^ TODO temporary hack to make alice and bob appear not editable even when they really are

	_environment = {hash1, isBeaker, isEditable};
}
var _environment;
exporty({getEnvironment});

//the hash of this installation that's running, the hyperdrive we're on or got exported from
function hash1() { return _environment.hash1; }//on first run after install, set in settings from window location
//we're running in a browser that lets us clone a drive and link to hyper:// (even if the window location is http)
function isBeaker() { return _environment.isBeaker; }
//we're running our own installation, and can change settings and write new posts
function isEditable() { return _environment.isEditable; }
exporty({hash1, isBeaker, isEditable});
































//   _   _           _                   _____ _ _   _               _                    _   _               
//  | | | | __ _ ___| |__   ___  ___    |_   _(_) |_| | ___  ___    | |    ___   ___ __ _| |_(_) ___  _ __    
//  | |_| |/ _` / __| '_ \ / _ \/ __|     | | | | __| |/ _ \/ __|   | |   / _ \ / __/ _` | __| |/ _ \| '_ \   
//  |  _  | (_| \__ \ | | |  __/\__ \_    | | | | |_| |  __/\__ \_  | |__| (_) | (_| (_| | |_| | (_) | | | |_ 
//  |_| |_|\__,_|___/_| |_|\___||___( )   |_| |_|\__|_|\___||___( ) |_____\___/ \___\__,_|\__|_|\___/|_| |_( )
//                                  |/                          |/                                         |/ 
//   ____                                  _           ____             _                                _ 
//  / ___|  ___  __ _ _ __ ___   ___ _ __ | |_ ___    |  _ \ ___  _   _| |_ ___  ___      __ _ _ __   __| |
//  \___ \ / _ \/ _` | '_ ` _ \ / _ \ '_ \| __/ __|   | |_) / _ \| | | | __/ _ \/ __|    / _` | '_ \ / _` |
//   ___) |  __/ (_| | | | | | |  __/ | | | |_\__ \_  |  _ < (_) | |_| | ||  __/\__ \_  | (_| | | | | (_| |
//  |____/ \___|\__, |_| |_| |_|\___|_| |_|\__|___( ) |_| \_\___/ \__,_|\__\___||___( )  \__,_|_| |_|\__,_|
//              |___/                             |/                                |/                     
//   ____             _            
//  |  _ \ ___  _   _| |_ ___ _ __ 
//  | |_) / _ \| | | | __/ _ \ '__|
//  |  _ < (_) | |_| | ||  __/ |   
//  |_| \_\___/ \__,_|\__\___|_|   
//                                 

/*
As you browse around, there are two hashes in the address:

hyper://0101...0101/#/BLOG/title2~0202.0202...0202/posts
        ^                  ^
        |                  |
       "hash1()"           |
       The hash of the installation that's running
       Either the hash of the hyperdrive Beaker is navigated to, or the installation was exported from
       hash1's drive is editable if this is our installation, read-only if we clicked into someone else's
                           |
                          "s.hash2"
                          Route segment 2 contains another hash or title and hash
                          hash2 is the hash of the blog the running installation is navigated to
                          hash2 could be the hash of any blog, not just hash1 or a blog that hash1 follows

In Beaker, hash1 is always in the address bar, while exported it's not there
The root route redirects so hash2 is the same as hash1, which it gets from settings.js
The only time settings.js is missing is in Beaker right after install, this is when we set it from the window location

Get hash1 from calling hash1(), not from the window location, the answer comes from settings.js, set originally from window location
Get hash2 from calling getRouteSegments().hash2, the answer comes from $route.path

The route split into segments looks like this:

/BLOG/title~00ff00.00ff...00ff          1: brand, required
                                           not used, just there to flash the program brand in links and the location bar
                                        2: title and hash2, required
                                           the blog the running installation is navigated to

    /posts                              3: "posts", "feed", or "likes", required
    /feed                                  posts is everything posted or reposted by the blog
    /likes                                 feed is that for this blog and all the blogs it follows
                                           likes is all the posts this blog has liked

        /media                          4: "media", optional
                                           alternatively showcases the media of posts in a gallery format
                                           pagination works the same, using page and post below

            /tag/value1.value2          5: "tag", optional
                                        6: tags, optional
                                           filter the list by one or several tags

                /page/tick1-tick2       7: "page" or "post", optional
                /post/postid            8: tick ranges for page or post id for post
                                           paginate the list by a time range or one post at a time
                                           without page or post, you get the most recent on a first page

                    ~~andfollow         9: action, optional
                    ~~andlike.postid       follow this blog, or like the post with the given id
                                           the user has clicked from someone else's blog to their own

listPage and listTag take handle all the routes that show 0, 1, or more posts filtered down many ways
hash2 identifies a specific blog, "posts" lets through fewer posts than "feed", and the remaining segments filter further

Careful to use only the unreserved characters - . _ ~ in the route
Avoid # ? = % + space and others, which are either reserved, or should be percent%20encoded
https://perishablepress.com/stop-using-unsafe-characters-in-urls/
*/
function getRouteSegments() {
	var s = {};

	//get information from the route that led us here
	var d = getPageData();
	var path = d.$route.path;
	s.params = d.$route.params;

	//the end of the route might have an action, like "~~andfollow" or "~~andlike.somepostid"
	var action = "";
	if (has(path, "~~and")) {
		var c = cut(path, "~~");
		path = c.before;
		action = c.after;
	}
	s.path = path;
	s.action = action;

	//split the route that led us here into segments
	var p = path.split("/");
	s.s1 = (p.length > 1) ? p[1] : "";
	s.s2 = (p.length > 2) ? p[2] : "";
	s.s3 = (p.length > 3) ? p[3] : "";
	s.s4 = (p.length > 4) ? p[4] : "";
	s.s5 = (p.length > 5) ? p[5] : "";
	s.s6 = (p.length > 6) ? p[6] : "";
	s.s7 = (p.length > 7) ? p[7] : "";
	s.s8 = (p.length > 8) ? p[8] : "";
	s.s9 = (p.length > 9) ? p[9] : "";

	var t = cut(path, "/"); t = cut(t.after, "/"); t = cut(t.after, "/");
	s.s3all = t.after;

	//get hash2, while beaker is navigated to our installation at hash1(), our installation is navigated to the blog with s.hash2
	s.hash2 = has(s.s2, "~") ? onlyHashCharacters(cut(s.s2, "~").after) : s.s2;//parse hash2 out of segment 2
	checkHash(s.hash2);//and make sure it's a valid hash

	return s;
}












//given the hash of a blog, look up the blog's title from our own settings or graph settings we've gathered
function lookupTitle(hash) {
	return composeTitle(getSettings(hash).header.title, hash);

	/*
	if (hash == hash1()) {
		return composeTitle(store.settings.header.title, hash);//it's the title of this installation
	} else if (store.graph[hash] && store.graph[hash].header) {
		return composeTitle(store.graph[hash].header.title, hash);//we've got the title in the store
	} else {
		return composeTitle("", hash);//don't know yet, which is fine
	}
	*/
}
//given title and hash text, compose all the different short and long forms for display
function composeTitle(title, hash) {
	checkHash(hash);

	//title like "Blog_Title" and just the start for text on a browser tab
	title = validName(title);
	var tab = title;
	if (tab.length > 8) tab = start(tab, 8);

	//short hash or title and hash for the page like "Blog_Title~0000ff"
	//and full for links like "Blog_Title~0000ff.ff0000ffff0000ffff0000ffff0000ffff0000ffff0000ffff0000ffff"
	var short = hasText(title) ? title+"~"+start(hash, 6)                     : start(hash, 6);
	var full  = hasText(title) ? title+"~"+start(hash, 6)+"."+beyond(hash, 6) : hash;

	return {title, tab, short, full, hash};
}
test(function() {
	var c = composeTitle("Blog Title", "0000ffff0000ffff0000ffff0000ffff0000ffff0000ffff0000ffff0000ffff");//title and hash
	ok(c.title == "Blog_Title");
	ok(c.tab   == "Blog_Tit");//cut off for browser tab text like "Blog_Tit[BLOG]follows"
	ok(c.short == "Blog_Title~0000ff");
	ok(c.full  == "Blog_Title~0000ff.ff0000ffff0000ffff0000ffff0000ffff0000ffff0000ffff0000ffff");
	ok(c.hash  ==             "0000ffff0000ffff0000ffff0000ffff0000ffff0000ffff0000ffff0000ffff");

	c = composeTitle("", "0000ffff0000ffff0000ffff0000ffff0000ffff0000ffff0000ffff0000ffff");//title not valid or known
	ok(c.title == "");
	ok(c.tab   == "");
	ok(c.short == "0000ff");
	ok(c.full  == "0000ffff0000ffff0000ffff0000ffff0000ffff0000ffff0000ffff0000ffff");//no period
	ok(c.hash  == "0000ffff0000ffff0000ffff0000ffff0000ffff0000ffff0000ffff0000ffff");
});
exporty({lookupTitle, composeTitle});


















//   ____             _            
//  |  _ \ ___  _   _| |_ ___ _ __ 
//  | |_) / _ \| | | | __/ _ \ '__|
//  |  _ < (_) | |_| | ||  __/ |   
//  |_| \_\___/ \__,_|\__\___|_|   
//                                 

var _currentPageData;//the data object of the vue component instance below we're navigated to and most recently made
function keepPageData(d) { _currentPageData = d; }//call this method to save it
function getPageData() { return _currentPageData; }
function remake() { if (_currentPageData && _currentPageData.remake) _currentPageData.remake(); }
exporty({keepPageData, getPageData, remake});
/*
TODO this is something of a hack you may want to revisit later, or replace with vuex
otherwise you'd need a lot of code that manually updates the right parts of the right components
instead, just change anything, and then call remake()
vue will remake all the components on the page, as though you just started a new navigation
leaning heavily on the dom-diffing algorithm, only the parts of the page that are actually different should change
there's no browser navigation, no parts of the page should flicker, and the scroll position should be fine, too
*/

var router;
function startRouter() {

	// Map routes from the browser location to the Vue component to show
	var routes = [

		{ path: "/", component: homePage.registered },//TODO redirect to your feed

		{ path: "/demo",  component: demoPage.registered  },//these demos are not part of the finished design
		{ path: "/fresh", component: freshPage.registered },//example to investigate the global refresh
		{ path: "/mill",  component: millPage.registered  },//text processing mill, TODO refactor to mill.html

		{ path: "/:segmentBrand/:segmentBlog/write",             component: editPage.registered },//write a new post
		{ path: "/:segmentBrand/:segmentBlog/edit/:segmentPost", component: editPage.registered },//edit an existing post

		{ path: "/:segmentBrand/:segmentBlog/settings", component: settingsPage.registered },
		{ path: "/:segmentBrand/:segmentBlog/follows",  component: followsPage.registered  },
		{ path: "/:segmentBrand/:segmentBlog/about",    component: aboutPage.registered    },//about dlog
		{ path: "/:segmentBrand/:segmentBlog/system",   component: systemPage.registered   },//under the hood, gather stats, store size, logs and errors

		{ path: "/:segmentBrand/:segmentBlog/posts*", component: listPage.registered },
		{ path: "/:segmentBrand/:segmentBlog/feed*",  component: listPage.registered },
		{ path: "/:segmentBrand/:segmentBlog/likes*", component: listPage.registered },//TODO likes is also composed by listPage

		{ path: "*", component: notFoundPage.registered }
	];

	// Hook up VueRouter and Vue to be in charge of putting HTML on the page
	router = new VueRouter({ routes });
	var pageVue = new Vue({ router }).$mount("#pageid");
}
exporty({getRouteSegments, router, startRouter});










//TODO move to mill.html, alongside the same util.js

var millWordsPerPage = 250;
var millCharactersPerLine = 80;

var millPage = registerComponent({
name: "millPage",
template: `<millTag :m="m" />`,
data() { keepPageData(this); return { m: millTag.make(), remake() { this.m = millTag.make(); } } }
});

var millTag = registerComponent({
name: "millTag",
props: ["m"],
template: `
<div>
	<h1>Mill</h1>
	<p><i>~ mill tag ~</i></p>
	<topTag :m="m.topTagModel" />
	<p>
		{{ m.countPages }}, {{ m.countWords }}, {{ m.countCharacters }},
		<button @click="m.formatToEdit">To Edit</button>
		<button @click="m.formatToText">To Text</button>
		<button @click="m.formatToKindle">To Kindle</button>
	</p>
	<p>
		<button @click="m.formatUnfancy">Unfancy</button> <button @click="m.formatRefancy">Refancy</button>,
		<button @click="m.formatSentenceize">Sentenceize</button> <button @click="m.formatParagraphize">Paragraphize</button>,
		<button @click="m.formatRender">Render</button> <button @click="m.formatWrap">Wrap</button>,
		<button @click="m.formatExpand">Expand</button> <button @click="m.formatCondense">Condense</button>,
		<button @click="m.snippet">Snippet</button>
	</p>
	<p><textarea v-model="m.body" @input="m.bodyInput" placeholder="Body"></textarea></p>
</div>
`,
make() {
var empty = {
	topTagModel: topTag.make(),
	body: "",
	countCharacters: "", countWords: "", countPages: "",
	formatToEdit: noop, formatToText: noop, formatToKindle: noop,
	formatUnfancy: noop, formatRefancy: noop,
	formatSentenceize: noop, formatParagraphize: noop,
	formatRender: noop, formatWrap: noop,
	formatExpand: noop, formatCondense: noop,
	snippet: noop,
};
try {

	var m = {};
	m.topTagModel = topTag.make();
	m.body = "";

	m.bodyInput = function() {
		var body = m.body;
		m.countCharacters = things(body.length, "character");
		var words = lineToWords(body);
		m.countWords = things(words.length, "word");
		m.countPages = things((Math.ceil(words.length / millWordsPerPage)), "page");
	}
	m.bodyInput();//run to show "0 pages" and so on on the page at the start

	m.formatToEdit   = function() { m.body = millToEdit(m.body);   }
	m.formatToText   = function() { m.body = millToText(m.body);   }
	m.formatToKindle = function() { m.body = millToKindle(m.body); }

	m.formatUnfancy = function() { m.body = millUnfancy(m.body); }
	m.formatRefancy = function() { m.body = millRefancy(m.body); }

	m.formatSentenceize  = function() { m.body = millSentenceize(m.body); }
	m.formatParagraphize = function() { m.body = millParagraphize(m.body); }

	m.formatRender = function() { m.body = millRender(m.body); }
	m.formatWrap   = function() { m.body = millWrap(m.body); }

	m.formatExpand   = function() { m.body = millExpand(m.body); }
	m.formatCondense = function() { m.body = millCondense(m.body); }

	m.snippet = millSnippet;
	return m;

} catch (e) { logError("millTag make", {e}); return empty; }
}
});

function millToEdit(block) {
	block = millUnfancy(block);
	block = millSentenceize(block);
	block = millCondense(block);
	return block;
}
function millToText(block) {
	block = millUnfancy(block);
	block = millSentenceize(block);
	block = millCondense(block);

	block = millParagraphize(block);
	block = millWrap(block);
	return block;
}
function millToKindle(block) {
	block = millUnfancy(block);
	block = millSentenceize(block);
	block = millCondense(block);

	block = millParagraphize(block);
	block = millRefancy(block);
	block = millRender(block);
	block = millExpand(block);
	block = millCondense(block);
	block = millWrap(block);
	return linesToString([
		"<html>",
		"<head>",
		"<title>SETTITLESETTITLESETTITLE</title>",
		"</head>",
		"<body>",
		"",
		...stringToLines(block.trim()),
		"",
		"</body>",
		"</html>"]);
}

function millUnfancy(block) {
	return unfancyIncludingBacktick(block);
}
function millRefancy(block) {
	var lines = stringToLines(block);
	var refancyLines = [];
	lines.forEach(line => {
		refancyLines.push(refancy(line));
	});
	return linesToString(refancyLines);
}

function millSentenceize(block) {
	var lines = stringToLines(block);
	var paragraphLines = linesToParagraphLines(lines);
	var sentenceLines = [];
	paragraphLines.forEach(paragraphLine => {
		sentenceLines = sentenceLines.concat(paragraphLineToSentenceLines(gapsToSpace(paragraphLine).trim()));
	});
	return linesToString(sentenceLines);
}
function millParagraphize(block) {
	var lines = stringToLines(block);
	var paragraphLines = linesToParagraphLines(lines);
	return linesToString(paragraphLines);
}

function millRender(block) {
	return markdownToHTML(block);
}
function millWrap(block) {
	var lines = stringToLines(block);
	var paragraphLines = linesToParagraphLines(lines);
	var wrappedLines = [];
	paragraphLines.forEach(paragraphLine => {
		if (hasText(paragraphLine)) wrappedLines = wrappedLines.concat(wrapLineToWidth(paragraphLine, millCharactersPerLine));
		else                        wrappedLines.push("");
	});
	return linesToString(wrappedLines);
}

function millExpand(block) {
	var lines = stringToLines(block);
	var expandedLines = [];
	lines.forEach(line => {
		expandedLines = expandedLines.concat([line, ""]);
	});
	return linesToString(expandedLines);
}
function millCondense(block) {
	var lines = stringToLines(block);
	var condensedLines = ["", ...condenseBlankLines(lines), ""];
	return linesToString(condensedLines);
}

function millSnippet() {
	log("mill snippet");
}

exporty({millPage, millTag});





























//tiny log and toss
function log(...a) {
	a.forEach(e => console.log(e));
}
function logError(note, watch) {
	var description = "[LOG ERROR] " + note + _describe(watch);
	console.error(description);
	if (watch) console.error(watch);
}
function toss(note, watch) {
	var description = "[TOSS] " + note + _describe(watch);
	console.error(description);
	if (watch) console.error(watch);
	throw new Error(description);
}
function _describe(watch) {
	var s = "";//TODO here's where you'd put in the timestamp prefix if you add that
	if (watch)
		for (var k in watch)
			s += `\r\n-- ${k} (${typeof watch[k]}) ${JSON.stringify(watch[k])}`;
	return s;
}
exporty({log, logError, toss});


















//        _               _    
//    ___| |__   ___  ___| | __
//   / __| '_ \ / _ \/ __| |/ /
//  | (__| | | |  __/ (__|   < 
//   \___|_| |_|\___|\___|_|\_\
//                             

/*************************************************************************/
/*                                                                       */
/*                                  (`-.                                 */
/*                                   \  `                                */
/*      /)         ,   '--.           \    `                             */
/*     //     , '          \/          \   `   `                         */
/*    //    ,'              ./         /\    \>- `   ,----------.        */
/*   ( \  ,'    .-.-._        /      ,' /\    \   . `            `.      */
/*    \ \'     /.--. .)       ./   ,'  /  \     .      `           `.    */
/*     \     -{/    \ .)        / /   / ,' \       `     `-----.     \   */
/*     <\      )     ).:)       ./   /,' ,' \        `.  /\)    `.    \  */
/*      >^,  //     /..:)       /   //--'    \         `(         )    ) */
/*       | ,'/     /. .:)      /   (/         \          \       /    /  */
/*       ( |(_    (...::)     (                \       .-.\     /   ,'   */
/*       (O| /     \:.::)                      /\    ,'   \)   /  ,'     */
/*        \|/      /`.:::)                   ,/  \  /         (  /       */
/*                /  /`,.:)                ,'/    )/           \ \       */
/*              ,' ,'.'  `:>-._._________,<;'    (/            (,'       */
/*            ,'  /  |     `^-^--^--^-^-^-'                              */
/*  .--------'   /   |                                                   */
/* (       .----'    |   *************************************************/
/*  \ <`.  \         |   */
/*   \ \ `. \        |   */  // Make sure s is a string that has some text,
/*    \ \  `.`.      |   */  // meaning it's not blank, and not just space
/*     \ \   `.`.    |   */  function checkText(s) {
/*      \ \    `.`.  |   */    if (!hasText(s)) toss("no text", {s});
/*       \ \     `.`.|   */  }
/*        \ \      `.`.  */  function badText(s) {
/*         \ \     ,^-'  */    return !hasText(s);
/*          \ \    |     */  }
/*           `.`.  |     */  function hasText(s) {
/*              .`.|     */    return (
/*               `._>    */      typeof s == "string" &&
/*                       */      s.length &&
/*       g o o d w i n   */      s.trim() != ""
/*                       */    );
/*************************/  }

// Make sure i is a whole integer with a value of m or greater
function toIntCheck(n, m) { var i = toInt(n); checkInt(i, m); return i; }
function toInt(n) {
	var i = parseInt(n, 10);//specify radix of base10
	if (i+"" !== n) toss("round trip mismatch", {n, i});
	return i;
}
function checkInt(i, m) { if (badInt(i, m)) toss("Must be an integer m or higher", {i, m}); }
function minInt(i, m) { return !badInt(i, m); }
function badInt(i, m) {
	if (!m) m = 0;//TODO potentially huge change, make sure -5 is truthy enough to make it through this
	return !(typeof i === "number" && !isNaN(i) && Number.isInteger(i) && i >= m);
}

// Make sure a is an array with at least one element
function checkArray(a) { if (badArray(a)) toss("Must be an array", {a}); }
function badArray(a) {
	return !(typeof a === "object" && typeof a.length == "number" && a.length > 0);
}
//TODO added new stuff, write test cases

exporty({checkText, badText, hasText});
exporty({toIntCheck, toInt, checkInt, minInt, badInt});
exporty({checkArray, badArray});

//   _            _   
//  | |_ _____  _| |_ 
//  | __/ _ \ \/ / __|
//  | ||  __/>  <| |_ 
//   \__\___/_/\_\\__|
//                    

function start(s, n)  { return clip(s, 0, n); }            // Clip out the first n characters of s, start(s, 3) is CCCccccccc	
function end(s, n)    { return clip(s, s.length - n, n); } // Clip out the last n characters of s, end(s, 3) is cccccccCCC	
function beyond(s, i) { return clip(s, i, s.length - i); } // Clip out the characters beyond index i in s, beyond(s, 3) is cccCCCCCCC	
function chop(s, n)   { return clip(s, 0, s.length - n); } // Chop the last n characters off the end of s, chop(s, 3) is CCCCCCCccc	
function clip(s, i, n) {                                   // Clip out part of s, clip(s, 5, 3) is cccccCCCcc
	if (i < 0 || n < 0 || i + n > s.length) toss("Avoided clipping beyond the edges of the given string", {s, i, n});
	return s.substring(i, i + n);
}
//TODO these throw if anything is out of bounds, maybe add startSoft, endSoft, beyondSoft that instead return shorter or blank

function has(s, t)    { return                      findFirst(s, t) != -1; } // True if s contains t
function starts(s, t) { return _mightStart(s, t) && findFirst(s, t) == 0; } // True if s starts with t
function ends(s, t)   { return _mightEnd(s, t)   && findLast(s, t) == s.length - t.length; } // True if s ends with t

function cut(s, t)     { return _cut(s, t, findFirst(s, t)); } // Cut s around t to get what's before and after
function cutLast(s, t) { return _cut(s, t, findLast(s, t)); } // Cut s around the last place t appears to get what's before and after
function _cut(s, t, i) {
	if (i == -1) {
		return { found: false, before: s, tag: "", after: "" };
	} else {
		return {
			found:  true, // We found t at i, clip out the text before and after it
			before: start(s, i),
			tag:    clip(s, i, t.length), // Include t to have all parts of s
			after:  beyond(s, i + t.length)
		};
	}
}
// Keep starts() and ends() from making indexOf() scan the whole thing if the first character doesn't even match
function _mightStart(s, t) { return s.length && t.length && s.charAt(0)            == t.charAt(0); }
function _mightEnd(s, t)   { return s.length && t.length && s.charAt(s.length - 1) == t.charAt(t.length - 1); }
// Don't give indexOf() blank strings, because somehow "abc".indexOf("") is 0 first not -1 not found
function findFirst(s, t) { if (s.length && t.length) return s.indexOf(t);     else return -1; }
function findLast(s, t)  { if (s.length && t.length) return s.lastIndexOf(t); else return -1; }

// In a single pass through s, replace whole instances of t1 with t2
function swap(s, t1, t2) {
	var s2 = "";          // Target string to fill with text as we break off parts and make the replacement
	while (s.length) {    // Loop until s is blank, also makes sure it's a string
		var c = cut(s, t1); // Cut s around the first instance of the tag in it
		s2 += c.before;     // Move the part before from s to done
		if (c.found) s2 += t2;
		s = c.after;
	}
	return s2;
}

// Parse out the part of s between t1 and t2
function parse(s, t1, t2) {
	var c1 = cut(s,        t1);
	var c2 = cut(c1.after, t2);
	if (c1.found && c2.found) {
		return {
			found:     true,
			before:    c1.before,
			tagBefore: c1.tag,
			middle:    c2.before,
			tagAfter:  c2.tag,
			after:     c2.after
		};
	} else {
		return { found: false, before: s, tagBefore: "", middle: "", tagAfter: "", after: "" };
	}
}

exporty({start, end, beyond, chop, clip});
exporty({has, starts, ends});
exporty({findFirst, findLast});
exporty({cut, cutLast});
exporty({swap, parse});

//   _ _                 
//  | (_)_ __   ___  ___ 
//  | | | '_ \ / _ \/ __|
//  | | | | | |  __/\__ \
//  |_|_|_| |_|\___||___/
//                       

// Compose lines

// Convert an array of lines into text with "\r\n" at the end of each
function linesToString(lines) {
	var s = "";
	for (var i = 0; i < lines.length; i++) s += lines[i] + "\r\n";//works on linux, mac, *and* windows, bro
	return s;
}

// Parse lines

// Split text with "\r\n" or just "\n" into an array of lines
function stringToLines(s) {
	var lines = s.split("\n");
	for (var i = 0; i < lines.length; i++) {
		if (ends(lines[i], "\r")) lines[i] = chop(lines[i], 1);
	}
	return lines;
}

// Split a list of lines into paragraphs separated by blank lines
function linesToParagraphs(a) {
	var b = []; // Lines in the current paragraph
	var c = []; // Finished paragraphs
	for (var i = 0; i < a.length; i++) {
		var s = a[i];
		if (badText(s)) { // We're on a blank line which separates paragraphs
			if (b.length) { // And we've got some lines in the current paragraph
				c.push(b);    // Finish the current paragraph
				b = [];       // Empty for the next paragraph
			}
		} else {
			b.push(s); // Add this line to the current paragraph
		}
	}
	if (b.length) c.push(b); // Take the last paragraph
	return c;
}

// Group neighboring nonblank lines together
function linesToParagraphLines(lines) {
	var paragraphLines = [];
	var currentLine = "";
	lines.forEach(line => {
		if (hasText(line)) {
			currentLine += line + " ";
		} else {
			if (hasText(currentLine)) {
				paragraphLines.push(currentLine.trimEnd());
				currentLine = "";
			}
			paragraphLines.push("");
		}
	});
	if (hasText(currentLine)) {
		paragraphLines.push(currentLine.trimEnd());
		currentLine = "";
	}
	return paragraphLines;
}

// Examine lines

// Given an array of lines, true if one matches line
function hasLine(lines, line) {
	for (var i = 0; i < lines.length; i++) {
		if (lines[i] == line) return true;
	}
	return false;
}

// Given lines and a starting index, return the index of that line if it has text or the next nonblank line
function findNextLine(lines, i) {
	if (i >= lines.length) return -1; // Already on the end, not found
	for (; i < lines.length; i++) { // Loop from i forward
		if (hasText(lines[i])) return i; // Found a line with some text, return the line's index
	}
	return -1; // No more lines or they're all blank
}

exporty({linesToString, stringToLines, linesToParagraphs, linesToParagraphLines});
exporty({hasLine, findNextLine});

//                                                 
//   _ __ ___   ___  ___ ___  __ _  __ _  ___  ___ 
//  | '_ ` _ \ / _ \/ __/ __|/ _` |/ _` |/ _ \/ __|
//  | | | | | |  __/\__ \__ \ (_| | (_| |  __/\__ \
//  |_| |_| |_|\___||___/___/\__,_|\__, |\___||___/
//                                 |___/           

//moved below and refactored

//               _ _       
//   _   _ _ __ (_) |_ ___ 
//  | | | | '_ \| | __/ __|
//  | |_| | | | | | |_\__ \
//   \__,_|_| |_|_|\__|___/
//                         

// Describe big sizes and counts in four digits or less
function size4(n)   { return _number4(n, 1024, [" bytes", " KB", " MB", " GB", " TB", " PB", " EB", " ZB", " YB"]); }
function number4(n) { return _number4(n, 1000, ["",       " K",  " M",  " B",  " T",  " P",  " E",  " Z",  " Y"]);  }
function _number4(n, power, units) {
	var u = 0; // Start on the first unit
	var d = 1; // Which has a value of 1 each
	while (u < units.length) { // Loop to larger units until we can say n in four digits or less

		var w = Math.floor(n / d); // Find out how many of the current unit we have
		if (w <= 9999) return w + units[u]; // Four digits or less, use this unit

		u++; // Move to the next larger unit
		d *= power;
	}
	return n+""; // We ran out of units
}

exporty({size4, number4});

//   _ _ _                    _           
//  | (_) |__  _ __ __ _ _ __(_) ___  ___ 
//  | | | '_ \| '__/ _` | '__| |/ _ \/ __|
//  | | | |_) | | | (_| | |  | |  __/\__ \
//  |_|_|_.__/|_|  \__,_|_|  |_|\___||___/
//                                        

// Convert a string in markdown format like "# Title" into HTML like "<h1>Title</h1>"
function markdownToHTML(m) {

	// The first time we're called, configure the markdown-it library
	if (!_markdownit) {
		_markdownit = markdownit({
			html: true, // Let HTML tags in the markdown pass through
			quotes: '“”‘’', // Curl quotes
			highlight: function(s, language) { // Use highlight.js for code syntax highlighting
				if (language && hljs.getLanguage(language)) {
					try { return hljs.highlight(language, s).value; } catch (e) {}
				}
				return ""; // Use external default escaping
			}
		});
	}

	// Convert the given markdown text into HTML
	return _markdownit.render(m); // Throws if there's a problem
}
var _markdownit; // Save the object we got from loading markdown-it to use it again next time

// Convert some text in YAML into a JavaScript object
function yamlToObject(y) {
	return jsyaml.safeLoad(y);
}

// Convert a JavaScript object into text in YAML format
function objectToYAML(o) {
	return jsyaml.safeDump(o);
}

exporty({markdownToHTML});
exporty({yamlToObject, objectToYAML});

//   ____             _           _      _                         
//  / ___|  ___  _ __| |_ ___  __| |    / \   _ __ _ __ __ _ _   _ 
//  \___ \ / _ \| '__| __/ _ \/ _` |   / _ \ | '__| '__/ _` | | | |
//   ___) | (_) | |  | ||  __/ (_| |  / ___ \| |  | | | (_| | |_| |
//  |____/ \___/|_|   \__\___|\__,_| /_/   \_\_|  |_|  \__,_|\__, |
//                                                           |___/ 

// Keep an array sorted as we add elements to it
function SortedArray(compareFunction, startingArray) {
	var list = {};
	list.c = compareFunction; // Pass in a function that can compare two elements
	list.a = startingArray ? startingArray : []; // Start out empty, or use the given array which must already be sorted

	list.has  = function (e) { return list.find(e) != -1;   } // True if e is the same as something we have
	list.find = function (e) { return _sortedFind(list, e); } // Find the index of an item that matches e in list, -1 not found
	list.add  = function (e) { return _sortedAdd(list, e);  } // Add e to list, which is sorted and allows duplicates
	return list;
}
function _sortedFind(list, e) {

	var p = 0;             // Distance to first item in clip
	var q = list.a.length; // Distance beyond last item in clip
	var r;                 // Zero if same, negative if e is lighter, positive means e is heavier

	while (true) {

		var n = q - p;                 // Width of clip
		var z = q - 1;                 // Distance to last item in clip
		var m = p + Math.floor(n / 2); // Distance to middle item in clip

		if (n == 0) { // Empty

			return -1;

		} else if (n < 4) { // Too few items for middle to be useful

			r = list.c(e, list.a[p]); if (r == 0) return p; if (r < 0) return -1; // Found, or can't be before
			p++; // Loop again to look after

		} else { // Middle is useful

			r = list.c(e, list.a[p]); if (r == 0) return p; if (r < 0) return -1; // Found, or can't be before
			r = list.c(e, list.a[z]); if (r == 0) return z; if (r > 0) return -1; // Found, or can't be after
			r = list.c(e, list.a[m]); if (r == 0) return m; // Found
			if (r < 0) { p++; q = m; } else { p = m + 1; q--; } // Look next in lighter or heavier half
		}
	}
}
function _sortedAdd(list, e) {

	var p = 0;             // Distance to first item in clip
	var q = list.a.length; // Distance beyond last item in clip
	var r;                 // Zero if same, negative if e is lighter, positive means e is heavier

	while (true) {

		var n = q - p;                 // Width of clip
		var z = q - 1;                 // Distance to last item in clip
		var m = p + Math.floor(n / 2); // Distance to middle item in clip

		if (n == 0) { // Empty

			list.a.splice(p, 0, e); return;

		} else if (n < 4) { // Too few items for middle to be useful

			r = list.c(e, list.a[p]);
			if (r <= 0) { list.a.splice(p, 0, e); return; } // Same or lighter
			p++; // Heavier, loop again to look after

		} else { // Middle is useful

			r = list.c(e, list.a[p]); if (r <= 0) { list.a.splice(p, 0, e); return; } // Same or lighter
			r = list.c(e, list.a[z]); if (r >= 0) { list.a.splice(q, 0, e); return; } // Same or heavier
			r = list.c(e, list.a[m]); if (r == 0) { list.a.splice(m, 0, e); return; }
			if (r < 0) { p++; q = m; } else { p = m + 1; q--; } // Look next in lighter or heavier half
		}
	}
}
exporty({SortedArray});




























function registerComponent(t) {
	t.registered = Vue.component(t.name, t);
	return t;
}
exporty({registerComponent});

var idn_i, idn_s;
function idn() {
	if (!idn_s) idn_s = "id"; // Starting prefix
	if (!idn_i || idn_i > 9000000000000000) { idn_s += "n"; idn_i = 1; } // It's over nine thousand! actually quadrillion
	return idn_s + idn_i++; // Increment number for next time
}
exporty({idn});















// Make s n long by adding t to the start or end
function widenStart(s, t, n) { widenCheck(s, t, n); while (s.length < n) s = t + s; return s; }
function widenEnd(s, t, n)   { widenCheck(s, t, n); while (s.length < n) s = s + t; return s; }
function widenCheck(s, t, n) {
	checkInt(n, 0);
	if (!t.length) toss("t must have length", {s, t, n});
}
exporty({widenStart, widenEnd});



// Make a random string using 0-9 and a-f that's n characters long
function randomBase16(n) {
	checkInt(n, 0);
	var s = "";
	while (s.length < n) s += randomBase16Part();
	return start(s, n);
}
function randomBase16Part() {
	var s = (Math.random()).toString(16);
	s = widenEnd(s, "0", 15);//put 0s on the end
	return clip(s, 2, 12);
}
exporty({randomBase16});





//given a multiline string with blank first and last lines, and a whitespace margin before each line, remove that margin
//returns s unchanged if anything doesn't look right
function margin(s) {
	var l = stringToLines(s);
	if (!l.length) return s;//no lines
	if (hasText(l[0]) || hasText(l[l.length - 1])) return s;//edge text
	if (!(starts(l[1], " ") || starts(l[1], "\t"))) return s;//first line must start with space or tab

	var f = l[1];//first line
	var w = start(f, 1);//tab or space character
	var n = 0;//number of those at the start of the first line
	for (var i = 0; i < f.length; i++) { if (f[i] == w) n++; else break; }
	if (!n) return s;

	var a = [];//array to fill and return
	for (var i = 1; i < l.length - 1; i++) {//loop through lines not including blank first and last
		var line = l[i];
		if (hasText(line)) {
			if (line.length < n) return s;//line too short
			for (var j = 0; j < n; j++) { if (line[j] != w) return s; }//line doesn't start with w characters
			a.push(beyond(line, n));
		} else {
			a.push(line);
		}
	}
	return linesToString(a);
}
exporty({margin});












//we're going to write a .js file, and include s in it as a multiline template string literal
//for that to work, we need to escape `, ${}, and \ itself
function escapeForTemplateString(s) {
	s = swap(s, "\\",  "\\\\");//replace \ with \\ first
	s = swap(s, "`",   "\\`");//because we'll add more backslahes to escape backtick and template
	s = swap(s, "${",  "\\${");
	return s;
}
//now we've opened a .js file, not ran it, and want to get back to the original string
//we need to undo the escaping
function unescapeFromTemplateString(s) {
	s = swap(s, "\\`",  "`");//first remove backslashes that are here just to escape other characters
	s = swap(s, "\\${", "${");
	s = swap(s, "\\\\", "\\");//now that the escaping backslashes are gone, restore actual document ones
	return s;
}
exporty({escapeForTemplateString, unescapeFromTemplateString});

test(function() {
	function f(s1, n) {
		var s2 = escapeForTemplateString(s1);
		var s3 = unescapeFromTemplateString(s2);
		ok(s1.length == n);//make sure we got the number of characters we expect
		ok(s1 == s3);//make sure escaping and unescaping gets us back to the starting text
		//uncomment to take a look at them all
		//log(`[${s1}] length ${s1.length} > [${s2}] length ${s2.length} > [${s3}] length ${s3.length}`)
	}
	f("ab", 2);//2 regular characters
	f("a`b", 3);//backtick
	f("a\\b", 3);//single slash
	f("a\\\\b", 4);//two slashes in a row
	f("a${b}c", 6);//template code

	//already escaped backtick and template code
	f("a\\`b", 4);
	f("a\\${b}c", 7);

	//you do have to escape backslash in javascript strings, for literals enclosed by both quotes and the backtick
	f("a\b", 2);//two characters, 'a' and '\b', quotes
	f(`a\b`, 2);//two characters, 'a' and '\b', backtick
	f(`a\\b`, 3);//three characters, 'a', '\', and 'b'
	f("a\tb", 3);//clearly wrong if you want 4 characters in there
	f(`a\tb`, 3);//using backtick to express a string is no different, it turns out
});

















//                 _ _                                                       
//  __      ___ __(_) |_ ___   _ __ ___   ___  ___ ___  __ _  __ _  ___  ___ 
//  \ \ /\ / / '__| | __/ _ \ | '_ ` _ \ / _ \/ __/ __|/ _` |/ _` |/ _ \/ __|
//   \ V  V /| |  | | ||  __/ | | | | | |  __/\__ \__ \ (_| | (_| |  __/\__ \
//    \_/\_/ |_|  |_|\__\___| |_| |_| |_|\___||___/___/\__,_|\__, |\___||___/
//                                                           |___/           

//given a header object and lines of body text, create a message object with a bookend and message.lines
function createMessage(header, bodyLines) {
	if (!bodyLines) bodyLines = [];
	var message = {header, bodyLines};
	message.headerLines = trimBlankLines(stringToLines(objectToYAML(message.header)));
	if (bodyLines.length) message.lines = ["---", ...message.headerLines, "---", "", ...message.bodyLines, ""];
	else                  message.lines = ["---", ...message.headerLines, "---"];
	if (badText(message.bookend))//no bookend chosen yet, pick a short one
		message.bookend = "========MESSAGE=BOOKEND=" + end(Math.random()+"", 4)         + "========";
	if (hasLine(message.lines, message.bookend))//that's already in there, pick a really long one
		message.bookend = "========MESSAGE=BOOKEND=" + (randomBase16(32).toUpperCase()) + "========";
	return message;
}

//compose messages with .header and .bodyBlock or .bodyLines into multiline strings for a file or script
function messagesToFileBlock(messages)   { return linesToString(messagesToFileLines(messages));   }
function messagesToStringBlock(messages) { return linesToString(messagesToStringLines(messages)); }

exporty({createMessage, messagesToFileBlock, messagesToStringBlock});

function messagesToFileLines(messages) {
	var lines = messagesToStringLines(messages);
	lines = lines.map(line => escapeForTemplateString(line));
	lines.unshift("messages(`");
	lines.push("`);");
	return lines;
}
function messagesToStringLines(messages) {
	var lines = [];
	messages.forEach(message => { lines = lines.concat([message.bookend, ...message.lines, message.bookend]); });
	return lines;
}

//                      _                                                 
//   _ __ ___  __ _  __| |  _ __ ___   ___  ___ ___  __ _  __ _  ___  ___ 
//  | '__/ _ \/ _` |/ _` | | '_ ` _ \ / _ \/ __/ __|/ _` |/ _` |/ _ \/ __|
//  | | |  __/ (_| | (_| | | | | | | |  __/\__ \__ \ (_| | (_| |  __/\__ \
//  |_|  \___|\__,_|\__,_| |_| |_| |_|\___||___/___/\__,_|\__, |\___||___/
//                                                        |___/           

//parse messages from a multiline string beaker read from a .js file
function fileBlockToMessages(fileBlock) {//multiline string beaker read from the file
	var blockLines = stringToLines(fileBlock);//split into lines

	var firstBookend = findFirstBookend(blockLines);//find the first and last bookends
	var lastBookend = findLastBookend(blockLines);
	if (firstBookend == -1 || lastBookend == -1 || firstBookend == lastBookend)
		toss("can't find first and last bookends", {fileBlock, firstBookend, lastBookend});

	var escapedLines = blockLines.slice(firstBookend, lastBookend + 1);//just the messages with the bookends
	var lines = escapedLines.map(line => unescapeFromTemplateString(line));//remove backtick escape that doesn't read as js
	return parseMessages(lines);//now the lines are the same as if they came from script
}
function findFirstBookend(l) { for (var i = 0; i < l.length; i++)     { if (starts(l[i], "=")) return i; } return -1; }
function findLastBookend(l) { for (var i = l.length - 1; i >= 0; i--) { if (starts(l[i], "=")) return i; } return -1; }

//parse messages from a multiline string in script
function stringBlockToMessages(stringBlock) {//multiline string the browser got from a js file
	var lines = stringToLines(stringBlock);//split into lines
	return parseMessages(lines);
}
exporty({fileBlockToMessages, stringBlockToMessages});

function parseMessages(lines) {
	var messages = [];
	var i = 0;
	var j, bookend, message;
	while (i < lines.length) {
		i = findNextLine(lines, i);//move past blank lines to the start of the next message
		if (i == -1) return messages;//no more blank lines, we're done
		bookend = lines[i];
		if (!starts(bookend, "=")) toss("bad bookend", {lines, i, bookend});
		var j = measureMessage(lines, i);//point j beyond this message
		if (j == -1) toss("message fragment", {lines, bookend, i, j});
		try {
			var message = parseMessage(bookend, lines.slice(i + 1, j - 1));
			message.bookend = bookend;
			messages.push(message);
		} catch (e) { logError("bad message", {e, bookend}); }//bad message, but keep going with the next one
		i = j;//move beyond the message we just parsed or tried to parse
	}
	return messages;
}

function parseMessage(bookend, lines) {
	var a = findNextLine(lines, 0);//move past blank lines before the headers
	if (a == -1) toss("bad message, blank", {lines, bookend});
	if (!starts(lines[a], "-")) toss("bad message, no header start", {lines, bookend, a});
	var b = measureMessage(lines, a);//point b beyond the headers
	if (b == -1) toss("bad message, no header end", {lines, bookend, a, b});
	var headerLines = lines.slice(a + 1, b - 1);
	var bodyLines = lines.slice(b, lines.length);
	var header = yamlToObject((linesToString(headerLines)));
	return {bookend, lines, headerLines, header, bodyLines};
}

// Given lines and index i pointed to the first line of the remaining messages
// Return the index after the next message, or -1 if something is wrong
function measureMessage(lines, i) {
	if (i >= lines.length) return -1;
	var separator = lines[i]; i++;
	for (; i < lines.length; i++) {
		if (lines[i] == separator) return i + 1; // Valid message at i, return index beyond it
	}
	return -1; // Not found
}

test(function() {

var b = `
messages(\`
========MESSAGE=BOOKEND=1449========
---
key1: value1
---
first
back\\\`tick
last
========MESSAGE=BOOKEND=1449========
\`);
`;//block that beaker would read from a file, with excaped backticks
var m = fileBlockToMessages(b);
ok(m.length == 1);
ok(m[0].header.key1 == "value1");
ok(m[0].bodyLines[1] == "back`tick");

var b = `
========MESSAGE=BOOKEND=1449========
---
key1: value1
---
back\`tick
========MESSAGE=BOOKEND=1449========
========MESSAGE=BOOKEND=7856========
---
key2: value2
---
second body
========MESSAGE=BOOKEND=7856========
`;//block that the script would get as a string, with non-escaped backticks
var m = stringBlockToMessages(b);
ok(m.length == 2);
ok(m[0].header.key1 == "value1");
ok(m[1].header.key2 == "value2");
ok(m[0].bodyLines[0] == "back`tick");
ok(m[1].bodyLines[0] == "second body");
});
test(function() {

var block = `
========MESSAGE=BOOKEND=1111========
---
key1: value1
---
body1
========MESSAGE=BOOKEND=1111========
========MESSAGE=BOOKEND=2222========
---
key2: value2
---
========MESSAGE=BOOKEND=2222========
========MESSAGE=BOOKEND=3333========
---
---
body3
========MESSAGE=BOOKEND=3333========

`;
var messages = stringBlockToMessages(block);
//log(messages);
});

//turn the given javascript object into yaml, put that into the header of a single message, escaped to write to a file, and back again
function objectToFileBlock(o) { return messagesToFileBlock([createMessage(o)]); }
function fileBlockToObject(s) { return fileBlockToMessages(s)[0].header; }
exporty({objectToFileBlock, fileBlockToObject});
test(function() {
	var o = { color: "blue", number: 7 };
	var s = objectToFileBlock(o);
	var o2 = fileBlockToObject(s);
	ok(o2.color == "blue" && o2.number == 7);
});


















//   _     _                 
//  | |   (_)_ __   ___  ___ 
//  | |   | | '_ \ / _ \/ __|
//  | |___| | | | |  __/\__ \
//  |_____|_|_| |_|\___||___/
//                           

//given a list of lines, remove all the blank lines, returns a new array
function removeBlankLines(lines) {
	var l = [];
	lines.forEach(line => { if (hasText(line)) l.push(line); });
	return l;
}

//given a list of lines, remove blank lines at the start and the end, edits the given array
function trimBlankLines(lines) {
	while (lines.length && badText(lines[0])) lines.shift();//remove blank at the start
	while (lines.length && badText(lines[lines.length - 1])) lines.pop();//remove blank at the end
	return lines;
}

//given a list of lines, replace multiple blank lines with a single blank line, returns a new array
function condenseBlankLines(lines) {
	var l = [];
	var spaced = false;
	lines.forEach(line => {
		if (hasText(line)) { spaced = false; l.push(line); }
		else if (!spaced) { spaced = true; l.push(""); }
	});
	return trimBlankLines(l);//also remove blank lines at the start and end
}

exporty({removeBlankLines, trimBlankLines, condenseBlankLines});

test(function() {
var block = `

line1

line2a
line2b


line3

line4a
line4b

`;

	var lines = stringToLines(block);
	ok(lines.length == 14);
	ok(removeBlankLines(lines).length == 6);
	ok(trimBlankLines(lines).length == 10);
	ok(condenseBlankLines(lines).length == 9);
});

//  __        __            _     
//  \ \      / /__  _ __ __| |___ 
//   \ \ /\ / / _ \| '__/ _` / __|
//    \ V  V / (_) | | | (_| \__ \
//     \_/\_/ \___/|_|  \__,_|___/
//                                

//a single line, words in a line, wrap

//given a long single line, return a list of lines wrapped to the given width in characters
function wrapLineToWidth(line, wrapWidth) {
	if (!wrapWidth) wrapWidth = 80;//default column width
	var lines = [];//list of short lines we'll build and return
	var words = lineToWords(line.trim());//given words, all trimmed, no blanks
	var s = "";//line to build up underneath width, unless not possible
	for (var i = 0; i < words.length; i++) {//loop for each word
		var word = words[i];
		var propsed = (s + " " + word).trim();//see what the new word looks like on our current line
		if (propsed.length <= wrapWidth) {//fits, used proposed
			s = propsed;
		} else {//overflows, start new line
			lines.push(s);
			s = word;
		}
		if (i == words.length - 1) { lines.push(s); }//last word
	}
	return lines;
}
test(function() {
	var line = "    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Two spaces, and aReallyLongWordThatWillGetItsOwnLineGoingOverTheWidth, but that's ok.";
	var lines = wrapLineToWidth(line, 40);
	ok(lines[3] == "aliqua. Two spaces, and");//two spaces became one space
	ok(lines[4] == "aReallyLongWordThatWillGetItsOwnLineGoingOverTheWidth,");
});

//split a line into an array of words, all trimmed, no blanks
function lineToWords(line) {
	line = onlySpaces(line);//turn tabs and any \r\n in there all into spaces
	var a = line.split(" ");//split on space
	var words = [];
	for (var i = 0; i < a.length; i++) {
		var w = a[i];
		w = w.trim();
		if (hasText(w)) words.push(w);//only return words, no blanks
	}
	return words;
}
test(function() {
	ok(lineToWords(" a b  c ").length == 3);
});

exporty({wrapLineToWidth, lineToWords});

//    ____ _                          _                
//   / ___| |__   __ _ _ __ __ _  ___| |_ ___ _ __ ___ 
//  | |   | '_ \ / _` | '__/ _` |/ __| __/ _ \ '__/ __|
//  | |___| | | | (_| | | | (_| | (__| ||  __/ |  \__ \
//   \____|_| |_|\__,_|_|  \__,_|\___|\__\___|_|  |___/
//                                                     

//replace characters that include formatting with simple characters that don't
//the right place to curl quotes and show long dashes is in the view on the page, not here in the text data
function unfancyIncludingBacktick(s) {
	s = swap(s, "`", "'");//backtick
	return unfancy(s);
}
function unfancy(s) {

	//uncurl quotes, and replace other fancy characters with simple characters
	s = swap(s, "‘", "'");//single curls
	s = swap(s, "’", "'");
	s = swap(s, "“", '"');//double curls
	s = swap(s, "”", '"');
	s = swap(s, "′", "'");//single prime
	s = swap(s, "″", '"');//double prime, https://en.wikipedia.org/wiki/Prime_(symbol)
	s = swap(s, "–", "--");//dashes
	s = swap(s, "—", "--");
	s = swap(s, "―", "--");
	s = swap(s, "‒", "--");
	s = swap(s, "…", "...");//ellipsis
	s = swap(s, "�", "<?>");//the weird unicode replacement character

	return s;
}
function refancy(s) {
	s = swap(s, "--", "—");
	s = swap(s, "...", "…");
	s = smartquotes(s);//recurl quotes and add primes using smartquotes.js
	return s;
}
test(function() {
	ok(unfancy(`“Yeah…” he said.`) == `"Yeah..." he said.`);
	ok(refancy(`"Yeah..." he said.`) == `“Yeah…” he said.`);
	var s1 = `“Better than a 65′6″ whale.” — Captain Ahab; “It’s my ‘#1’ choice!” — 12″ Foam Finger from ’93`;
	var s2 = `"Better than a 65'6" whale." -- Captain Ahab; "It's my '#1' choice!" -- 12" Foam Finger from '93`;
	ok(unfancy(s1) == s2);
	ok(refancy(s2) == s1);
});

//turn all nonprinting characters in s like tabs and newline characters into spaces
function onlySpaces(s) {
	var t = "";
	for (c of s) t += c.trim().length ? c : " ";//if c trims to blank, mark it with a space
	return t;
}

//turn all nonprinting characters in s except for tabs into spaces
function onlyTabsAndSpaces(s) {
	var t = "";
	for (c of s) t += (c == "\t" || c.trim().length) ? c : " ";
	return t;
}

//shorten stretches of nonprinting characters to leave only two spaces and single spaces
function gapsToDoubleSpace(s) {
	s = onlySpaces(s);
	while (has(s, "   ")) s = swap(s, "   ", "  ");//end up with one 1 and 2 spaces together
	return s;
}

//squash all stretches of nonprinting characters like spaces, tabs, and newlines into single spaces
function gapsToSpace(s) {
	s = onlySpaces(s);//turn space-like characters like tab and newline into actual spaces
	while (has(s, "  ")) s = swap(s, "  ", " ");//turn multiple spaces into a single space
	return s;
}

//replace spaces with thin spaces so its a readable "12 345" for everyone rather than "12,345" US and "12.345" EU
function thinSpaces(s) {
	var t = String.fromCodePoint(0x2009); // Thin space
	return swap(s, " ", t);
}
//TODO Vue even replaces this with the html &thinsp; which is super correct, but it's not any narrower in Chrome

exporty({unfancyIncludingBacktick, unfancy, refancy});
exporty({onlySpaces, onlyTabsAndSpaces, gapsToDoubleSpace, gapsToSpace});
exporty({thinSpaces});

test(function() {

	var s1 = "\ta\r\n  bb  ";
	var s2 = onlySpaces(s1);
	var s3 = gapsToDoubleSpace(s2);
	var s4 = gapsToSpace(s3);
	var s5 = s4.trim();
	ok(s2 == " a    bb  ");
	ok(s3 == " a  bb  ");
	ok(s4 == " a bb ");//notice how s still isn't trimmed
	ok(s5 == "a bb");

	ok(onlySpaces(" a b  cc ") == " a b  cc ");
	ok(onlySpaces("\t") == " ");//tab
	ok(onlySpaces("\n") == " ");//mac and linux newline
	ok(onlySpaces("\r\n") == "  ");//windows newline becomes two spaces, which is fine

	var s = thinSpaces(" ");
	ok(s.length == 1);//a thin space has length 1
	ok(s.trim() == "");//and trims down to nothing just like a normal space

	s = thinSpaces("a b");
	ok(s != "a b");//a thin space is different than a normal space
	ok(onlySpaces(s), "a b");//but onlySpaces() makes it normal again
});













//return s with everything except 0-9 and a-f removed
//useful as a part of checking drive hash strings
function onlyHashCharacters(s) {

	var a1 = "0".charCodeAt(0); var a2 = "9".charCodeAt(0);
	var a3 = "a".charCodeAt(0); var a4 = "f".charCodeAt(0);

	var t = "";
	for (var i = 0; i < s.length; i++) {
		var c = s.charAt(i); var a = c.charCodeAt(0);
		if ((a >= a1 && a <= a2) || (a >= a3 && a <= a4)) t += c;
	}
	return t;
}

//return s with everything except 0-9 and a-z removed
//useful as a part of correcting tags
function onlyLettersAndNumbers(s) {

	var a1 = "0".charCodeAt(0); var a2 = "9".charCodeAt(0);
	var a3 = "a".charCodeAt(0); var a4 = "z".charCodeAt(0);

	var t = "";
	for (var i = 0; i < s.length; i++) {
		var c = s.charAt(i); var a = c.charCodeAt(0);
		if ((a >= a1 && a <= a2) || (a >= a3 && a <= a4)) t += c;
	}
	return t;
}

//return s with everything except 0-9 a-z A-Z and .-_ removed
//useful as a part of correcting blog names
function onlyNameCharacters(s) {

	var a1 = "0".charCodeAt(0); var a2 = "9".charCodeAt(0);
	var a3 = "a".charCodeAt(0); var a4 = "z".charCodeAt(0);
	var a5 = "A".charCodeAt(0); var a6 = "Z".charCodeAt(0);

	var a7 = ".".charCodeAt(0);
	var a8 = "-".charCodeAt(0);
	var a9 = "_".charCodeAt(0);

	var t = "";
	for (var i = 0; i < s.length; i++) {
		var c = s.charAt(i); var a = c.charCodeAt(0);
		if ((a >= a1 && a <= a2) || (a >= a3 && a <= a4) || (a >= a5 && a <= a6) || a == a7 || a == a8 || a == a9) t += c;
	}
	return t;
}

exporty({onlyHashCharacters, onlyLettersAndNumbers, onlyNameCharacters});

test(function() {
	var s = " 0123456789 一二三 abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ .-_ 🌴? yes ";
	ok(onlyHashCharacters(s) == "0123456789abcdefe");
	ok(onlyLettersAndNumbers(s) == "0123456789abcdefghijklmnopqrstuvwxyzyes");
	ok(onlyNameCharacters(s) == "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.-_yes");
});

































//   ____                     
//  |  _ \ _ __ ___  ___  ___ 
//  | |_) | '__/ _ \/ __|/ _ \
//  |  __/| | | (_) \__ \  __/
//  |_|   |_|  \___/|___/\___|
//                            

/*
TODO make these buttons next to a text area on the page
[Format Prose to Read] wrapping to text area
[Format Prose to Edit] one sentence on each line
[Format Prose to Save] wrapped to 80 characters
[Undo] just for prose, this will mess up markdown and code

use these functions for badly formatted internet prose, like from usenet
not markdown or code blocks, those will get messed up
do these break a markdown link that wraps onto the next line?
*/

//combine neighboring lines to single lines that wrap with the text area
function formatProseToRead(areaBlock) {
	var paragraphLines = formatProse(areaBlock);
	var lines = [];
	paragraphLines.forEach(paragraphLine => {
		lines.push(paragraphLine);
		lines.push("");
	});
	return trimBlankLines(lines);//remove the last blank line we added after the last paragraph
}

//split on period to put every sentence on a separate line
function formatProseToEdit(areaBlock) {
	var paragraphLines = formatProse(areaBlock);
	var lines = [];
	paragraphLines.forEach(paragraphLine => {
		var sentenceLines = paragraphLineToSentenceLines(paragraphLine);
		lines = lines.concat(sentenceLines);
		lines.push("");
	});
	return trimBlankLines(lines);
}

//wrap words to 80 characters
function formatProseToSave(areaBlock, wrapWidth) {
	var paragraphLines = formatProse(areaBlock);
	var lines = [];
	paragraphLines.forEach(paragraphLine => {
		lines = lines.concat(wrapLineToWidth(paragraphLine, wrapWidth));
		lines.push("");
	});
	return trimBlankLines(lines);
}

exporty({formatProseToRead, formatProseToEdit, formatProseToSave});

//turn text from the user into a list of lines, each line is all the words of an entire paragraph
function formatProse(areaBlock) {

	//eliminate newlines
	var areaLines = stringToLines(areaBlock);

	//uncurl quotes, turn all nonprinting into space, and only allow single spaces
	var lines = [];
	areaLines.forEach(areaLine => lines.push(gapsToSpace(unfancyIncludingBacktick(areaLine)).trim()));

	//move the words from each paragraph onto a single line of words
	var paragraphs = linesToParagraphs(lines);
	var paragraphLines = [];
	paragraphs.forEach(paragraph => {
		var paragraphLine = "";
		paragraph.forEach(line => paragraphLine += line + " ");
		paragraphLines.push(paragraphLine.trim());
	});
	return paragraphLines;
}

//look for full stops and honorifics to split a line into sentences
function paragraphLineToSentenceLines(paragraphLine) {

	var s = paragraphLine;
	s = swap(s,  'Mr. ',  'Mr.\t');//hide common abbreviations with tabs
	s = swap(s, 'Mrs. ', 'Mrs.\t');
	s = swap(s,  'Ms. ',  'Ms.\t');
	s = swap(s,  'Dr. ',  'Dr.\t');
	s = swap(s,  'Jr. ',  'Jr.\t');

	s = swap(s, '." ', '."\n');//separate sentences with newlines
	s = swap(s, '?" ', '?"\n');
	s = swap(s, '!" ', '!"\n');
	s = swap(s, '. ',  '.\n');
	s = swap(s, '? ',  '?\n');
	s = swap(s, '! ',  '!\n');

	s = swap(s,  '\t',  ' ');//put the tabs away

	var sentenceLines = stringToLines(s);
	return sentenceLines;
}
test(function() {
	var paragraphLine = 'Yeah, well. Yeah, well? "Yeah," he said, "Well?" "I guess so." But Mr. Smith knew better.';
	var sentenceLines = paragraphLineToSentenceLines(paragraphLine);
	ok(sentenceLines.length == 5);
});

exporty({paragraphLineToSentenceLines});























//factoring math, time, date, and moment stuff into one place

//return a random integer between and including the given minimum and maximum
//pass 0 and 1 to flip a coin, 1 and 6 to roll a dice, and so on
//https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function randomBetween(minimum, maximum) {
	return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}
exporty({randomBetween});

//   ____        _       
//  |  _ \  __ _| |_ ___ 
//  | | | |/ _` | __/ _ \
//  | |_| | (_| | ||  __/
//  |____/ \__,_|\__\___|
//                       

var Time = {};
Time.second = 1000;//number of milliseconds in a second
Time.minute = 60*Time.second;//number of milliseconds in a minute
Time.hour = 60*Time.minute
Time.day = 24*Time.hour;
Time.week = 7*Time.day;
Time.year = Math.floor(365.25 * Time.day);
Time.month = Math.floor((Time.year) / 12);

var Size = {};
Size.b  = 1;            // One byte
Size.kb = 1024*Size.b;  // Number of bytes in a kibibyte, a kilobyte would be 1000 instead of 1024
Size.mb = 1024*Size.kb; // Number of bytes in a mebibyte
Size.gb = 1024*Size.mb; // Number of bytes in a gibibyte
Size.tb = 1024*Size.gb; // Number of bytes in a tebibyte
Size.pb = 1024*Size.tb; // Number of bytes in a pebibyte

exporty({Time, Size});

function now() { return Date.now(); }//tick count right now, number of milliseconds since start of 1970 jan 1
exporty({now});
var pattern1 = "YYYYMMMDD";
var pattern2 = "YYYY-MMM-DD h:mma";
var pattern3 = "YYYY MMMM D dddd h:mm A";
var pattern4 = "YYYYMMMDD.HH.mm.ss.SSS";
var pattern5 = "ddhh:mm:ss.SSS";
function sayDateDataShort(t) { checkInt(t); return moment(t).utc().format(pattern1).toLowerCase(); }//for file names
function sayDateDataLong(t)  { checkInt(t); return t + " " + ((new Date(t)).toUTCString()); }//for front matter
function sayDatePageShort(t) { checkInt(t); return moment(t).format(pattern2); }//for the page, local time zone
function sayDatePageLong(t)  { checkInt(t); return moment(t).format(pattern3); }
function tickToText(t)       { checkInt(t); return moment(t).utc().format(pattern4).toLowerCase(); }//for the location bar
function textToTick(s)       {              return moment.utc(s, pattern4).utc().valueOf(); }
exporty({sayDateDataShort, sayDateDataLong, sayDatePageShort, sayDatePageLong, tickToText, textToTick});
function nowStamp()          { return sayStamp(now()); }
function sayStamp(t)         { checkInt(t); return moment(t).format(pattern5); }
exporty({nowStamp, sayStamp});

noop(function() {

	var t = now();
	log(margin(`
		${sayDateDataLong(t)} -- sayDateDataLong()
		${sayDateDataShort(t)} -- sayDateDataShort()

		${sayDatePageShort(t)} -- sayDatePageShort()
		${sayDatePageLong(t)} -- sayDatePageLong()

		${tickToText(t)} -- tickToText()

		${t} -- now()
		${textToTick(tickToText(t))} -- round trip
	`));

	for (var i = 0; i < 10000; i++) {
		var t = now() - randomBetween(1, 20*Time.year);
		ok(textToTick(tickToText(t)) == t);
	}
});























//   ____             _             _   _             
//  |  _ \ __ _  __ _(_)_ __   __ _| |_(_) ___  _ __  
//  | |_) / _` |/ _` | | '_ \ / _` | __| |/ _ \| '_ \ 
//  |  __/ (_| | (_| | | | | | (_| | |_| | (_) | | | |
//  |_|   \__,_|\__, |_|_| |_|\__,_|\__|_|\___/|_| |_|
//              |___/                                 

/*
Imagine we've got total: items, and capacity: fit on each page.
paginate() figures out all the items and links that go on page:2,
or view:1 after the user clicks into the first item.

      __...--~~~~~-._   _.-~~~~~--...__
    //               `V'               \\ 
   //                 |                 \\ 
  //__...--~~~~~~-._  |  _.-~~~~~~--...__\\ 
 //__.....----~~~~._\ | /_.~~~~----.....__\\
====================\\|//====================
                dwb `---`

Call specifying either page: or view:

Returns 1+ item numbers, not 0+ array indices.
0 is falsy and separate from 1+ valid item numbers,
so instead of needing a boolean hasNext and an index next,
we can just have a single item number next.
And, you can show item numbers to the user,
who expects a list of 10 things to be numbered 1 through 10, not 0 through 9.
But remember to subtract 1 when dereferencing an array, like if (next) a[next-1];
*/
function paginate({capacity, total, page, view}) {

	if (capacity < 1 || total < 1) toss("bad inputs", {capacity, total});
	var pages = Math.ceil(total / capacity);

	if (page && !view) {//given a page number
		if (page < 1 || page > pages) toss("bad page number", {capacity, total, page, pages});//check it
		view = ((page - 1) * capacity) + 1;//choose the view

	} else if (!page && view) {//given a view number
		if (view < 1 || view > total) toss("bad view number", {total, view});//check it
		page = Math.ceil(view / capacity);//choose the page

	} else { toss("need page or view", {page, view}); }

	var before = view - 1;
	var after = view + 1; if (after > total) after = 0;

	var first = ((page - 1) * capacity) + 1;
	var last = page * capacity; if (last > total) last = total;
	var here = last + 1 - first;

	var previous = page - 1;
	var next = page + 1; if (next > pages) next = 0;

	return {

		//items, the first item is number 1, 0 means no item
		before, view, after,//number of the item in view, and the items before and after, or 0 if nothing before or after
		first, last,//number of the first and last items to show on the page
		here, capacity, total,//number of items on this page, allowed on any page, and total on all pages

		//pages, the first page is page 1, 0 means no page
		previous, page, next,//page number we're on, and before and after, or 0 if nothing beyond
		pages//how many pages there are
	};
}

noop(function() {
	var p = paginate({capacity: 3, total: 10, page: 2});//or specify view: instead of page:
	log(`
		viewing item ${p.before} < [${p.view}] > ${p.after} of ${p.total}
		on page ${p.previous} < [${p.page}] > ${p.next} of ${p.pages}
		which has ${p.here} items numbers ${p.first} through ${p.last}
		page capacity ${p.capacity}
	`);
});

/*
Figure out what posts we should put on each page, using the given list of posts.
paginateRange() takes ticks C and D to start and end the page with the posts that have those timestamps.
Figures out A and B on the page before this one, and E and F on the page after.
Returns returns tickA, indexA, and entryA, for A-F below, given just tickC and tickD.

-post-  the most recent post in the list we got, biggest tick
-post-

-post-  A
-post-     newer page, target for < arrow, hasAB true
-post-  B

-post-  C  post to list first on the current page we're on
-post-
-post-  D  post to list last on the current page

-post-  E
-post-     older page, target for > arrow, hasEF true
-post-  F

-post-
-post-  the first and oldest post, smallest tick, index length-1

Posts don't vanish, and have timestamps that don't change.
But, a moment later a remake() could happen with additional posts in the store.
It would be weird for the user if posts slid off the page,
or if clicking < Newer and then Older > could skip a post, or show some on both pages.

paginateRange() puts all the posts dated C through D on this page,
and use capacity only to plan out the neighboring pages.
Pages can grow longer as more posts come in.
Post timestamps don't change, though, so doing things this way has the benefits that:
Posts don't disappear off the page, other than off the bottom of the first page, and
what's written in the location bar doesn't become untrue as we find more posts.

Also, out of respect for the user's mind and the browser's memory,
absoutely not doing an infinite scroll.
https://ledger.humanetech.com/
*/

//on the first page, the most recent post is on top
//the page holds capacity posts, and posts get pushed off the bottom as more newer ones arrive
function paginateRecent(a, capacity) {

	//check
	checkInt(capacity, 1);//number of posts to group onto each page
	if (!a.length) toss("empty", a);

	//we're on the first page with the most recent stuff
	var indexC = 0;
	var indexD = capacity - 1; if (indexD >= a.length) indexD = a.length - 1;
	var entryC = a[indexC];
	var entryD = a[indexD];
	var tickC = entryC.tick;
	var tickD = entryD.tick;

	//now we have enough details to use the range function
	return paginateRange(a, capacity, tickC, tickD);
}

//clicking between pages, each page is defined to show all the posts dated between two timestamps which don't change
//more than capacity posts might render as more roll in, but the post you're reading won't get pushed off the edge
function paginateRange(a, capacity, tickC, tickD) {

	//check
	checkInt(capacity, 1);
	if (!a.length) toss("empty", a);

	//ticks
	checkInt(tickC, 0);
	checkInt(tickD, 0);
	if (tickC - tickD < 0) toss("c should be greater meaning newer than d", {tickC, tickD});

	//indexes
	var indexC = -1; for (var i = 0; i < a.length;      i++) { if (a[i].tick <= tickC) { indexC = i; break; } }
	var indexD = -1; for (var i = a.length - 1; i >= 0; i--) { if (a[i].tick >= tickD) { indexD = i; break; } }
	if (indexC == -1 || indexD == -1) toss("not found", {tickC, indexC, tickD, indexD});
	if (indexD - indexC < 0) toss("indexes should count from c to d", {tickC, indexC, tickD, indexD})

	//entries
	var entryC = a[indexC];
	var entryD = a[indexD];
	if (!entryC || !entryD) toss("not found", {tickC, indexC, entryC, tickD, indexD, entryD});

	//current page
	var p = {};
	p.capacity = capacity;
	p.hasCD = true;
	p.postsCD = indexD + 1 - indexC;
	p.tickC = tickC; p.indexC = indexC; p.entryC = entryC;//first post on current page
	p.tickD = tickD; p.indexD = indexD; p.entryD = entryD;//last post on current page

	//there is a "< Newer Posts" page before this one
	if (indexC) {
		p.hasAB = true;
		p.postsNewer = indexC;
		p.pagesNewer = Math.ceil(p.postsNewer / capacity);

		p.indexA = p.indexC - capacity; if (p.indexA < 0) p.indexA = 0;//newest page might have fewer posts
		p.indexB = p.indexC - 1;
		p.entryA = a[p.indexA];
		p.entryB = a[p.indexB];
		p.tickA = p.entryA.tick;
		p.tickB = p.entryB.tick;

		p.postsAB = p.indexB + 1 - p.indexA;

	//we're on the first page that starts with the most recent post
	} else {
		p.hasAB = false;
		p.postsAB = 0;
		p.postsNewer = 0;
		p.pagesNewer = 0;
	}

	//there is a "Older Posts >" page after this one
	if (indexD + 1 < a.length) {
		p.hasEF = true;
		p.postsOlder = a.length - indexD - 1;
		p.pagesOlder = Math.ceil(p.postsOlder / capacity);

		p.indexE = p.indexD + 1;
		p.indexF = p.indexD + capacity; if (p.indexF >= a.length) p.indexF = a.length - 1;//oldest page can also be shorter
		p.entryE = a[p.indexE];
		p.entryF = a[p.indexF];
		p.tickE = p.entryE.tick;
		p.tickF = p.entryF.tick;

		p.postsEF = p.indexF + 1 - p.indexE;

	//we're on the last page that ends with the oldest post
	} else {
		p.hasEF = false;
		p.postsEF = 0;
		p.postsOlder = 0;
		p.pagesOlder = 0;
	}

	p.posts = a.length;//total number of posts
	p.pages = p.pagesNewer + 1 + p.pagesOlder;//total number of pages
	return p;
}

exporty({paginate, paginateRecent, paginateRange});






























/*
Blog titles can't be longer than 32 characters.
Post titles, notes and other short text messages are limited to 500 characters.

Other username length limits:    Other short post limits:
-----------------------------    ---------------------------
15 Twitter                       140 Twitter classic
20 Reddit                        280 Twitter
30 Gmail                         500 Mastodon, and our limit
32 Tumblr, and our limit
*/
const nameLimit = 32;
const noteLimit = 500;
//validate and correct or blank the given name text from the user, our settings.js, or settings.js from another installation
function validName(s) {
	if (badText(s)) return "";//no name yet
	s = onlySpaces(s);//turn all whitespace into _
	s = swap(s, " ", "_");

	s = onlyNameCharacters(s);//only allow 0-9 a-z A-Z and .-_
	while (has(s, "..")) s = swap(s, "..", ".");//no punctuation duplicates
	while (has(s, "--")) s = swap(s, "--", "-");
	while (has(s, "__")) s = swap(s, "__", "_");

	if (s.length > nameLimit) s = start(s, nameLimit);//32 characters or less
	while (starts(s, ".") || starts(s, "-") || starts(s, "_")) s = beyond(s, 1);//no punctuation on the ends
	while (ends(s, ".") || ends(s, "-") || ends(s, "_")) s = chop(s, 1);

	//return blank if that blanked it
	return s;
}
test(function() {
	ok(validName("title1") == "title1");
	ok(validName("My Title") == "My_Title");
	ok(validName("uh...no") == "uh.no");
	ok(validName("~.a.b.c.~") == "a.b.c");
	ok(validName("000009999900000999990000099999aaaa") == "000009999900000999990000099999aa");//34 shortened to 32
})
//validate and correct or blank the given text of a short note
function validNote(s) {
	if (badText(s)) return "";//no note yet
	s = gapsToSpace(s).trim();//turn all whitespace gaps into single spaces
	if (s.length > noteLimit) s = start(s, noteLimit);
	return s;
}
//make sure s looks like a valid hash value
function checkHash(s) { if (!hashLooksValid(s)) toss("bad hash", {s}); }
//true if s looks like a valid hash value
function hashLooksValid(s) { return hasText(s) && s.length == 64 && s == onlyHashCharacters(s); }
//convert a drive hash like "00ff...ff00" to a complete hyper url like "hyper://00ff...ff00/"
function driveHashToHyperUrl(h) { checkHash(h); return "hyper://"+h+"/"; }
//parse the given hyper url like "hyper://00ff...ff00/" to get the drive hash like "00ff...ff00" or throw if missing or not valid
function hyperUrlToDriveHash(u) {
	var p = parse(u, "hyper://", "/");
	if (!p.found || hasText(p.before)) toss("not hyper", {u, p});
	checkHash(p.middle);
	return p.middle;
}
test(function() {
	ok(hashLooksValid("eda67eaf0786d8e62da7ea24edf143bf2249588511704b42b9057a910e9e29ab"));
	ok(!hashLooksValid("potato"));
});
exporty({validName, validNote, checkHash, hashLooksValid, driveHashToHyperUrl, hyperUrlToDriveHash});




































// Say "0 items", "1 item", "2 items", and so on
function things(n, name) { return (n == 1) ? ("1 "+name) : (n+" "+name+"s"); }//no commas, for internationalization
function thingsCommas(n, name) {//with commas
	if (!name) name = "item";
	if (n == 0) return `0 ${name}s`;
	if (n == 1) return `1 ${name}`;
	return `${commas(n+"")} ${name}s`;
}
// Format numerals with thousands separator, like "1,234"
function commas(s, separator) {
	if (!separator) separator = ",";
	var t = "";
	while (s.length > 3) { // Move commas and groups of 3 characters from s to t
		t = separator + end(s, 3) + t;
		s = chop(s, 3);
	}
	return s + t; // Move the leading group of up to 3 characters
}
test(function() {
	ok(things(0, "boat") == "0 boats");
	ok(things(1, "boat") == "1 boat");
	ok(things(2, "boat") == "2 boats");
	ok(things(2000, "boat") == "2000 boats");



	ok(thingsCommas(0, "muffin") == "0 muffins");
	ok(thingsCommas(1, "muffin") == "1 muffin");
	ok(thingsCommas(2, "muffin") == "2 muffins");
	ok(thingsCommas(3000, "cookie") == "3,000 cookies");

	ok(commas("12") == "12");
	ok(commas("12345") == "12,345");
});

exporty({things, thingsCommas, commas});





//here's one for the very start
function textOrBlank(s) { return hasText(s) ? s : ""; }
function intOrZero(s) {
	var i = Math.floor(parseInt(s, 10));//base 10
	if (i+"" != s) return 0;//round trip check
	return i;
}
exporty({textOrBlank, intOrZero});
test(function() {
	ok(intOrZero() == 0);
	ok(intOrZero("") == 0);
	ok(intOrZero("potato") == 0);
	ok(intOrZero("2.5") == 0);//floor takes it down to 2, but then fails the round trip check
	ok(intOrZero("5") == 5);
	ok(intOrZero("789") == 789);
});
































})(); // Run the unnamed function that has all the code in this file
