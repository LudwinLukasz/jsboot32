var GIPHY_API_URL = "http://api.giphy.com";
var GIPHY_PUB_KEY = "dc6zaTOxFJmzC";

App = React.createClass({
	getInitialState() {
		return {
			loading: false,
			searchingText: '',
			gif: {}
		};
	},

	httpGet(url_in) {
		return new Promise(
			function (resolve, reject) {
				const request = new XMLHttpRequest();
				request.onload = function () {
					if (this.status === 200) {
						var data = JSON.parse(request.responseText).data; // 4.
				 		var gif = {  // 5.
							url: data.fixed_width_downsampled_url,
							sourceUrl: data.url
						};
						resolve(gif)
					} else {
						reject(new Error(this.statusText)); 
					}
				};
				request.onerror = function () {
					reject(new Error(`XMLHttpRequest Error: ${this.statusText}`));
				};
				request.open('GET', url_in);
				request.send();
			}
		);
	},

	handleSearch: function(searchingText) {
		var self = this;
		self.setState({
			loading: true  // 2.
		});
		self.getGif(searchingText, function(gif) {  // 3.
			self.setState({
				loading: false,
				gif: gif,
				searchingText: ""  // c
			});
//    }).bind(this);
		});
	},

	getGif: function(searchingText, callback) {  // 1.		
		var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;  // 2.
	
		this.httpGet(url)
		.then(response => callback(response))
		.catch(error => console.error('The error reason is : ',error));
	},

	render: function() {
		var styles = {
			margin: '0 auto',
			textAlign: 'center',
			width: '90%'
		};

		return 	(
			<div style={styles}>
				<h1>Wyszukiwarka GIFow!</h1>
				<p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
				<Search onSearch={this.handleSearch}/>
				<Gif 
					loading={this.state.loading}
					url={this.state.gif.url}
					sourceUrl={this.state.gif.sourceUrl}
				/>
			</div>
		);
	}
});



