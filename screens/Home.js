import React, { Component } from 'react';
import {
	Text,
	View,
	Platform,
	Image,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	AsyncStorage
} from 'react-native';

import { MonoText } from '../components/StyledText';
import { FlatList } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

import HomeCell from '../components/HomeCell';
import { abandonmentPublicSrvc } from '../components/Service';

let serviceKey =
	'DrBCc6VIxYHNvgp3uEwtWG3WiZ3QdLS5khEl6Yltx3Kff0kbfNGPYODcrydKDEgNEMDDCEVyAJBv0hOkam5jMg%3D%3D';
let bgnde = '20190101'; //유기날짜 (검색 시작일) (YYYYMMDD)
let endde = '20190930'; //유기날짜 (검색 종료일) (YYYYMMDD)
let upkind = '41700'; // 축종코드 - 개 : 417000 - 고양이 : 422400 - 기타 : 429900
let kind = null; //품종코드 (품종 조회 OPEN API 참조)
let upr_ce = null; //시도코드 (시도 조회 OPEN API 참조)
let org_cd = null; //시군구코드 (시군구 조회 OPEN API 참조)
let care_reg_no = null; //보호소번호 (보호소 조회 OPEN API 참조)
let state = 'notice'; //상태 - 전체 : null(빈값) - 공고중 : notice - 보호중 : protect
let pageNo = '1'; //페이지 번호
let numOfRows = '10'; //페이지당 보여줄 개수
let neuter_yn = 'Y'; //중성화여부

const mockData = [
	{
		number: 1,
		shelterName: 'SANTA',
		shelterImage:
			'http://www.santavision.net/images/user/logo-login.png',
		email: 'thinkingbc@naver.com',
		donation: 1901300,
		name: '호주산불 구호 용품 지원',
		age: '3',
		abandonDate: '2020.01.10~2020.02.20',
		likes: '331',
		interests: '151',
		comments: '3',
		image: 'https://fergostackleworld.com.au/media/catalog/product/cache/1/image/920x880/9df78eab33525d08d6e5fb8d27136e95/b/u/bushfire-donation-2.jpg',
	},
	{
		number: 2,
		shelterName: 'UNICEF',
		shelterImage:
			'https://pbs.twimg.com/profile_images/1063217345529708544/rJeRWkla_400x400.jpg',
		email: 'unicef@uni.io',
		donation: 1499000,
		name: '아프리카 교육 후원',
		age: '3',
		abandonDate: '2019.12.31~2020.01.31',
		likes: '100',
		interests: '51',
		comments: '22',
		image: 'http://images.christiandaily.co.kr/data/images/full/2/59/25903.jpg?w=600',
	},
];

// let baseUrl =
// 	'http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc';
// let url =
// 	baseUrl +
// 	'?serviceKey=' +
// 	serviceKey +
// 	'&bgnde=' +
// 	bgnde +
// 	'&endde=' +
// 	endde +
// 	'&upkind=' +
// 	upkind +
// 	'&state=' +
// 	state +
// 	'&pageNo=' +
// 	pageNo +
// 	'&numOfRows=' +
// 	numOfRows +
// 	'&neuter_yn=' +
// 	neuter_yn;

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			refreshing: false,
			dogs: [mockData]
		};
	}

	componentDidMount() {
		return abandonmentPublicSrvc(
			serviceKey,
			bgnde,
			endde,
			upkind,
			kind,
			upr_ce,
			org_cd,
			care_reg_no,
			state,
			pageNo,
			numOfRows,
			neuter_yn
		);
	}

	static navigationOptions = ({ navigation }) => {
		const params = navigation.state.params || {};

		return {
			headerLeft: (
				<TouchableOpacity style={{ padding: 5, paddingLeft: 15 }}>
					<Ionicons name={'ios-menu'} size={35} color={'tomato'} />
				</TouchableOpacity>
			),
			headerRight: (
				<TouchableOpacity style={{ padding: 5, paddingRight: 15 }}>
					<Ionicons name={'ios-search'} size={35} color={'tomato'} />
				</TouchableOpacity>
			),
			title: 'HOME'
		};
	};

	refreshData = () => {
		//
	};

	//shelterName, name, age, abandonDate, likes, interests, comments, image
	renderItem = ({ item, index }) => {
		return (
			<HomeCell
				{...item}
			// shelterName={this.state.dogs.shelterName}
			// name={this.state.dogs.name}
			// age={this.state.dogs.age}
			// abandonDate={this.state.dogs.abandonDate}
			// likes={this.state.dogs.likes}
			// interests={this.state.dogs.interests}
			// comments={this.state.dogs.comments}
			// // image={this.state.dogs.}
			/>
		);
	};

	render() {
		return (
			<View style={styles.container}>
				<FlatList
					style={styles.flatlist}
					data={mockData}
					renderItem={this.renderItem}
					onRefresh={this.refreshData}
					refreshing={this.state.refreshing}
					keyExtractor={(item, index) => index.toString()}
					ItemSeparatorComponent={({ highlighted }) => (
						<View style={styles.itemSeparatorComponent} />
					)}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	flatlist: {
		flexGrow: 1
	},
	scrollView: {},
	itemSeparatorComponent: {
		height: StyleSheet.hairlineWidth,
		marginLeft: 10,
		marginRight: -10,
		width: '100%',
		backgroundColor: 'gray'
	}
});
