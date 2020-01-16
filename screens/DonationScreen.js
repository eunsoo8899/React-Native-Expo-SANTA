import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import DonationCell from '../components/DonationCell';

const mockData = [
	{
		name: '아프리카 교육 후원',
		shelterName: 'UNICEF',
		date: '2020.01.01',
		price: 100000,
		image: 'https://pbs.twimg.com/profile_images/1063217345529708544/rJeRWkla_400x400.jpg'
	},
	{
		name: '집다운 집으로',
		shelterName: '초록우산',
		date: '2020.01.05',
		price: 200000,
		image: 'https://pbs.twimg.com/profile_images/1125350743/CI_main_signature_symbol_logo02_400x400.jpg'
	},
	{
		name: '희망학교 지원 사업',
		shelterName: '굿 네이버스',
		date: '2020.01.10',
		price: 50000,
		image: 'https://scontent-icn1-1.xx.fbcdn.net/v/t1.0-9/10686841_959419480753308_5027192555934130822_n.png?_nc_cat=1&_nc_ohc=8AxJB2VIsyEAX9fqafk&_nc_ht=scontent-icn1-1.xx&oh=51ec40fe900e148730f180b1794923e5&oe=5E9FF7B1'
	},
	{
		name: '아침머꼬',
		shelterName: '월드비전',
		date: '2020.01.15',
		price: 50000,
		image: 'http://m.worldvision.or.kr/story/wp-content/uploads/2017/04/breakfast_mobile_01.jpg'
	},
	{
		name: '저소득 독거노인 지원',
		shelterName: '밀알복지재단',
		date: '2020.01.16',
		price: 10000,
		image: 'https://s3.ap-northeast-2.amazonaws.com/media.linkareer.com/activity_manager/logo/2017-09-051049014344690_%EA%B5%AD%EB%AC%B8_%EC%BD%94%ED%8D%BC%EB%A6%AC%ED%8A%B8%EB%A7%88%ED%81%AC_%EB%A1%9C%EA%B3%A0%EB%A7%8C_.jpg'
	},

];

export default class DonationScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			refreshing: false,
			comments: [mockData]
		};
	}
	static navigationOptions = ({ navigation }) => {
		// const params = navigation.state.params || {};
		//제목추가
		return {
			headerRight: <View style={{ padding: 5, paddingLeft: 15 }} />,
			title: '나의 기부 내역',
			headerTitleStyle: {
				textAlign: 'center',
				flex: 1,
				fontSize: 22
			}
		};
	};

	renderItem = ({ item }) => {
		return <DonationCell {...item} />;
	};

	render() {
		return (
			<View style={styles.box}>
				<ScrollView style={styles.commentScroll}>
					<FlatList
						style={styles.commentlist}
						data={mockData}
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
	box: {
		flex: 1,
		marginLeft: 15,
		marginRight: 15
	},
	commentlist: {
		paddingBottom: 5
	},
	commentScroll: {}
});
