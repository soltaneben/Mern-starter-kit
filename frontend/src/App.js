import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNavbar from './components/AppNavbar';
import ShopingList from './components/Shopinglist';
import store from './store';
import { Provider } from 'react-redux';
import ItemModal from './components/ItemModal';
import { Container } from 'reactstrap';
import { loadUser } from './actions/authActions';

class App extends Component {
	componentDidMount() {
		store.dispatch(loadUser());
	}
	render() {
		return (
			<Provider store={store}>
				<div className="App">
					<AppNavbar />
					<Container>
						<ItemModal />
						<ShopingList />
					</Container>
				</div>
			</Provider>
		);
	}
}

export default App;
