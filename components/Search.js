Search = React.createClass({
	getInitialState() {
		return {
			searchingText: ''
		};
	},
	handleChange: function(event) {
		var searchingText = event.target.value;
		this.setState({searchingText: searchingText});

		if (searchingText.length > 2) {
			this.props.onSearch(searchingText);
		}
	},

	handleKeyUp: function(event) {
		if (event.keyCode === 13) {
			this.props.onSearch(this.state.searchingText);
		}
	},

	render: function() {
		var style = {
			fontSize: '1.5em', 
			width: '90%', 
			maxWidth: '350px'
		};

		return (
			<input
			 type="text"
			 onChange={this.handleChange}
			 onKeyUp={this.handleKeyUp}
			 placeholder="Tutaj wpisz wyszukiwaną frazę"
			 style={style}
			 value={this.state.searchingText}
			/>
		)
	}
});
