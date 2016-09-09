import React from 'react';
import { connect } from 'react-redux';



import { TweenMax, TimelineMax } from 'gsap';




class Main extends React.Component {

	componentDidMount(){
		console.log(Cookie.get('hidden'));
		if (!Cookie.get('hidden')){
			this._show();
		}
	}

	_show(){
		const { sportik, sportik__text } = this.refs;

		var tl = new TimelineMax();
		
		tl.fromTo( sportik, 1, {
			right: '-500px',
			transform: 'scale(.2)',
		},{
			right: '50px',
			transform: 'scale(1)',
		})
		.fromTo( sportik__text, .5, {
			transform: 'scale(0)',
		},{
			transform: 'scale(1)',
		});
	}

	_hide(){
		const { sportik } = this.refs;
		
		TweenMax.to( sportik, .5, {
			right: '-500px',
		});
	}

	_closeHandler = () => (e) => {
		e.preventDefault();


		Cookie.set('hidden', 'yes', { 
			expires: new Date(new Date().getTime() + .5 * 60 * 1000), 
			domain: PromoOptions.cookieDomain, 
			path: '/'
		});

		console.log(Cookie.get('hidden'));
		this._hide();
	}

	render(){
		const { props } = this;
		console.log(23);


		const styles = {
			sportik: {
				position: 'fixed',
				right: '-500px',
				bottom: '50px',
				zIndex: 5000000,
			},
			image: {
				display: 'block',
				width: '250px',
				height: '337px',
				background: 'url(' + PromoOptions.cdn + 'images/1.png) no-repeat',
			},
			close: {
				position: 'absolute',
				top: '0px',
				right: '0px',
				fontSize: '40px',
				cursor: 'pointer',
			},
			text: {
				position: 'absolute',
				bottom: '100%',
				right: '50%',
				fontSize: '20px',
				background: '#fff',
				padding: '10px',
				borderRadius: '30px',
				textAlign: 'center',
				maxWidth: '200px',
				minWidth: '150px',
				boxShadow: '0 0 15px rgba(0,0,0,.5)',
			},
		};


		return(

			<div ref="sportik" style={styles.sportik}>

				<span style={styles.image}></span>

				<span ref="sportik__text" style={styles.text}>Привет! Я тебя достану!</span>

				<span 
					style={styles.close}
					onClick={this._closeHandler()}
				>
					&times;
				</span>

			</div>
		);
	}
}



const mapStateToProps = (state, ownProps) => ({
	//profile: state.user.profile,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	//logout: () => dispatch(asyncActions.logout()), 
});

Main.propTypes = {
	mixClass: React.PropTypes.string,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
