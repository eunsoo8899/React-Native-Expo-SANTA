import React, { Component } from 'react';
import {
	Text,
	View,
	Image,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	TextInput
} from 'react-native';

import CommentCell from '../components/CommentCell';
import IconText from '../components/IconText';
import { FlatList } from 'react-native-gesture-handler';
import RoundImage from '../components/RoundImage';
import ListCell from '../components/ListCell';
import InfoText from '../components/InfoText';
import { withNavigation } from 'react-navigation';
const mockData = {
	shelterImage:
		'data:image/jpeg;base64,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',
	shelterName: '행복보호소',
	email: 'happyshelter@happy.com',
	donation: 1000000,
	number: 2,
	list: [
		{
			name: 'lov_lov',
			image:
				'https://img.hankyung.com/photo/201911/2019111810442087262-540x810.jpg'
		},
		{
			name: 'happy',
			image:
				'http://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2019/02/25/ZWoYwaT43sSP636867018560235932.jpg'
		},
		{
			name: 's00n_5',
			image:
				'http://images.sportskhan.net/article/2019/10/21/l_2019102102000858500187891.jpg'
		},
		{
			name: 'meas099',
			image:
				'https://spnimage.edaily.co.kr/images/Photo/files/NP/S/2018/10/PS18101500003.jpg'
		},
		{
			name: 'ju_hong',
			image:
				'https://t1.daumcdn.net/cfile/tistory/99476A415A55A1110D'
		},
	]
};
class ShelterProfileScreen extends Component {
	constructor(props) {
		super(props);
		// const data = this.props.navigation.getParam('HomeCell');
		const shelterName = this.props.navigation.getParam('shelterName');
		const shelterImage = this.props.navigation.getParam('shelterImage');
		const email = this.props.navigation.getParam('email');
		const donation = this.props.navigation.getParam('donation');

		this.state = {
			refreshing: false,
			// data       : mockData,
			// data         : [ mockData ],

			shelterName,
			shelterImage,
			email,
			donation,
			name: '강아지 이름',
			age: '강아지 나이',
			abandonDate: '2019.00.00',
			likes: '000',
			interests: '001',
			comments: '002',
			backing: '003'
		};
		console.log('------------props---------------');
		console.log(props);
	}

	// NavigationOptions
	static navigationOptions = ({ navigation }) => {
		return {
			title: '재단 정보'
		};
	};

	renderItem = ({ item }) => {
		return <ListCell {...item} />;
	};
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.shelterImage}>
					<RoundImage
						source={this.state.shelterImage}
						size={140}
						radius={70}
					/>
				</View>

				<Text style={styles.titleText}>
					{this.state.shelterName.toString()}
				</Text>
				<Text style={styles.emailText}>
					{this.state.email.toString()}
				</Text>

				<View style={styles.info}>
					<InfoText
						title={'총 기부금'}
						content={this.state.donation.toString()}
					/>
					<InfoText title={'기부해주신 분들'} content={mockData.list.length} />
				</View>

				<ScrollView style={styles.commentScroll}>
					<FlatList
						style={styles.commentlist}
						data={mockData.list}
						renderItem={this.renderItem}
						onRefresh={this.refreshData}
						refreshing={this.state.refreshing}
						keyExtractor={(item, index) => index.toString()}
					/>
				</ScrollView>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center'
	},
	shelterImage: {
		width: 140,
		height: 140,
		margin: 10
	},
	titleText: {
		height: 40,
		fontSize: 25
	},
	info: {
		paddingLeft: 15,
		paddingRight: 15,
		borderBottomWidth: 0.5,
		borderTopWidth: 0.5,
		borderBottomColor: 'gray',
		borderTopColor: 'gray'
	},
	emailText: {
		marginBottom: 10
	},
	itemBar: {
		height: 40,
		flexDirection: 'row',
		marginLeft: 15
	},
	contentScroll: {
		height: 220
	},
	showcomment: {
		color: 'gray',
		fontSize: 12,
		marginLeft: 15,
		paddingTop: 10,
		paddingBottom: 10
	},
	commentlist: {
		marginLeft: 15,
		paddingBottom: 5,
		marginTop: 5
	},
	commentScroll: {
		height: 60
	}
});

export default withNavigation(ShelterProfileScreen);
