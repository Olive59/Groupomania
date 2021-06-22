new Vue({
	el: 'form',
	data: {
		leType: 'password',
		EyeClose: true,
		EyeOpen : false
	},
	methods: {
		voir: function() {
			this.leType = 'text',
			this.EyeClose = false,
			this.EyeOpen  = true
		},
		cacher: function() {
			this.leType = 'password',
			this.EyeClose = true,
			this.EyeOpen  = false
		}
	}
});