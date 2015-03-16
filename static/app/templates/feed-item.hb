<div class="picture from">
	<img src="http://biz.prlog.org/InvokeMediaLabs/logo.jpg">
</div>
<div class='item-info'>
	<h3 class="challenge-name">{{title}} - {{type}}</h3>
	{{!-- <div class="date">Date</div> --}}
	{{#ifCond status 'pending'}}
		<div class="info">{{challenger.name}} have been challenged by {{challengee.name}}</div>
		<a class="accept" href="#">accept</a>
		<a class="decline" href="#">decline</a>
	{{/ifCond}}
	{{#ifCond status 'in-process'}}
		<div>Winner:</div>
		<a class="winner-cher" href="#">{{challenger.name}}</a>
		<a class="winner-chee" href="#">{{challengee.name}}</a>
	{{/ifCond}}

</div>
<div class="picture to">
	<img src="http://biz.prlog.org/InvokeMediaLabs/logo.jpg">
</div>

{{!-- <div class="comments-container">
	<ul class="comments">
		{{#each comments}}
			<li class='comment'>
				<span>{{name}}</span>
				{{comment}}
			</li>
		{{/each}}
		<li class='comment-send'>
			<textarea placeholder='Your comment goes here...'></textarea>
			<!-- <button>Send</button> -->
		</li>
	</ul>
</div> --}}