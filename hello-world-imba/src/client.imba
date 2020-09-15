var IM = require('imperial-metric')
var obj = require('./obj')
# obj = obj:obj

var objt = {name: 'Imba', type: 'Language'}

var store = {
	title: ""
	items: [
		{title: "git clone hello-world-imba"}
		{title: "npm install"}
		{title: "npm run dev"}
	{title: "play around"}
		{title: objt:type}
	{title: if obj == undefined then 'fail' else 'nofail'}
		{title: obj:one}
{title: obj:two}
		{title: JSON.stringify(obj)}
	]
}



tag App

# def setup
	  # alert('Setup!')

	def addItem
		data:items.push(title: data:title)
#		window.alert(typeof obj)
		data:title = ""


	def render
		<self.vbox>
			<header>
				<input[data:title] placeholder="New..." :keyup.enter.addItem>
				<button :tap.addItem> 'Add item'
			<ul> for item in data:items
				<li> item:title
Imba.mount <App[store]>

console.log(IM(10).from('inch').to('cm'))

# console.log(object.length);

# <div class="App vbox scheduled_"><header><input placeholder="New..."><button>Add item</button></header><ul><li>git clone hello-world-imba</li><li>npm install</li><li>npm run dev</li><li>play around</li></ul></div>


#  tag Wrong
# 	def render
# 		<h1> "Hello {Math.random}"
#
# let wrong = <Wrong>
#
# tag Right
# 	def render
# 		<self> <h1> "Hello {Math.random}"
# let right = <Right>
#
# Imba.mount wrong


# define a custom tag, inheriting from div
# tag App # from div
# 	def render
# 		<self> <h1> "Hello world"
#
# let app = <App.main>
#
# Imba.mount app
# The DOM tree of app is now:
# <div class='App main'><h1>Hello world</h1></div>
# <div class="App main scheduled_"><h1>Hello world</h1></div>


# define a custom tag, inheriting from div
# tag App
# 	# declaring custom properties
#
# 	prop slug
#
# 	def render
# 		<self>
# 			<h1> "Slug is: {slug}"
# 			if slug == '/home'
# 				<div> "You are home"
#
# Imba.mount <App.main.old.slugo slug='/home'>
# <div class="App main old slugo scheduled_"><h1>Slug is: /home</h1><div>You are home</div></div>

# tag App
# 	prop counter
# 	def render
# 		<self.bar>
# 			# handler will be called when clicking button
# 			<button :click=(do counter++)> "Increment"
# 			<div> "count is {counter}"
#
# Imba.mount <App.foo counter=0>
# <div class="App foo bar scheduled_"><button>Increment</button><div>count is 1</div></div>

# tag App
# 	def onsubmit e
# 		e.prevent
# 		window.alert('Tried to submit!')
#
# 	def render
# 		<self>
# 			<form>
# 				<input type='text'>
# 				<button type='submit'> "Submit"
#
# Imba.mount <App>
# <div class="App scheduled_"><form><input type="text"><button type="submit">Submit</button></form></div>


# tag Todo < li
# 	def clickRename
# 		trigger('itemrename',data)
#
# 	def clickTitle
# 		trigger('itemtoggle',data)
#
# 	def render
# 		<self .done=data:done>
# 			<span :tap.clickTitle> data:title
# 			<button :tap.clickRename> 'rename'
#
# tag Todos < ul
# 	def setup
# 		@items = [
# 			{title: "Remember milk", done: false}
# 			{title: "Test custom events", done: false}
# 		]
#
# 	# the inner todo triggers a custom itemtoggle event when tapped
# 	# which will bubble up and eventually trigger onitemtoggle here
# 	def onitemtoggle e
# 		e.data:done = !e.data:done
#
# 	def onitemrename e
# 		var todo = e.data
# 		todo:title = window.prompt("New title",todo:title)
#
# 	def render
# 		<self> for item in @items
# 			<Todo[item]>
#
# Imba.mount <Todos>
# <li class="Todo"><span>milk</span><button>rename</button></li>
# <li class="Todo done"><span>Test custom events</span><button>rename</button></li>
