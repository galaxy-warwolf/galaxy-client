import React from "react";
import {render} from "react-dom";
import {AppContainer} from "react-hot-loader";
import App from "./app.js";
import "./styles/main.scss";
import configureStore from "./redux/config/configureStore";

const store = configureStore();
/**
 *
 * 初始启动文件
 *
 */
render(<AppContainer><App store={store}/></AppContainer>, document.querySelector("#app"));

if (module && module.hot) {
	module.hot.accept('./app.js', () => {
		const App = require('./app.js').default;
		render(
			<AppContainer>
				<App store={store}/>
			</AppContainer>,
			document.querySelector("#app")
		);
	});
}
