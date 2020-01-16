import React, { Component } from 'react';
import {
	Text,
	View,
	Image,
	StyleSheet,
	ScrollView,
	FlatList
} from 'react-native';
import UsageCell from '../components/UsageCell';
import CancelButton from '../components/CancelButton'

const mockDataJan = [
	{
		purchasing: '소방용품 지원',
		date: '(2020년 1월 15일)',
		price: '2,000,000원'
	},
	{
		purchasing: '야생동물 구호 물자',
		date: '(2020년 1월 19일)',
		price: '2,000,000원'
	},
	{
		purchasing: '토지 재건 비용 지원',
		date: '(2020년 1월 20일)',
		price: '1,000,000원'
	},
	{
		purchasing: '자원봉사단 후원',
		date: '(2020년 1월 20일)',
		price: '1,000,000원'
	},
	{
		purchasing: '소방용품 지원',
		date: '(2020년 1월 21일)',
		price: '1,500,000원'
	},
	{
		purchasing: '재단 운영비',
		date: '(2020년 1월 25일)',
		price: '2,500,000원'
	}
];

const mockDataFeb = [
	{
		purchasing: '예산 사용 미정',
		date: '(2020년 2월)',
		price: '9,000,000원'
	},
];



export default class DonationUsageScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			refreshing: false,
			comments: [mockDataJan, mockDataFeb]
		};
	}

	static navigationOptions = ({ navigation }) => {
		const params = navigation.state.params || {};

		return {
			headerRight: <CancelButton onPress={() => navigation.navigate("Home")} />,
			title: "기부금 사용 내역",
			headerTitleStyle: {
				textAlign: "center",
				flex: 1,
				fontSize: 20
			}
		};
	};

	renderItem = ({ item }) => {
		return <UsageCell {...item} />;
	};

	render() {
		return (
			<View style={{ flex: 1 }}>
				<View
					style={{
						borderBottomColor: 'lightgray',
						borderBottomWidth: 1
					}}
				>
					<Image
						style={styles.profile}
						source={{
							uri:
								'http://www.santavision.net/images/user/logo-login.png'
						}}
					/>
					<Text style={{ textAlign: 'center', fontSize: 25 }}>
						SANTA
					</Text>
					<Text
						style={{
							textAlign: 'center',
							fontSize: 17,
							color: 'darkgray',
							marginBottom: 18
						}}
					>
						thingkingbc@naver.com
					</Text>
				</View>
				<View style={styles.container}>
					<View style={styles.range}>
						<Text style={styles.contents}>총 기부 받은 금액</Text>
					</View>
					<View style={styles.right}>
						<Text style={styles.contents}>19,001,300원</Text>
					</View>
				</View>
				<View style={styles.container}>
					<Text style={styles.contents}>진행 중인 사업</Text>
					<View style={styles.right}>
						<Text style={styles.contents}>1 / 10</Text>
					</View>
				</View>
				<View
					style={{
						borderBottomColor: 'lightgray',
						borderBottomWidth: 1,
						marginTop: 18
					}}
				/>
				<ScrollView>
					<Text style={styles.date}>2020년 01월</Text>
					<FlatList
						data={mockDataJan}
						renderItem={this.renderItem}
						onRefresh={this.refreshData}
						refreshing={this.state.refreshing}
						keyExtractor={(item, index) => index.toString()}
					/>
					<Text style={styles.date}>2020년 02월</Text>
					<FlatList
						data={mockDataFeb}
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
		width: '100%',
		// height: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 5,
		marginTop: 15
	},
	profile: {
		width: 120,
		height: 120,
		borderRadius: 60,
		marginTop: 35,
		marginBottom: 15,
		margin: 6,
		alignSelf: 'center'
	},
	contents: {
		paddingLeft: 15,
		color: '#49B9FB',
		fontSize: 23
	},
	right: {
		paddingRight: 15,
		marginLeft: 'auto'
	},
	date: {
		textAlign: 'center',
		fontSize: 17,
		color: 'lightgrey',
		marginTop: 12,
		marginBottom: 5
	},
	scrollView: {}
});
