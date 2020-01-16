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
	{
		number: 3,
		shelterName: '초록우산',
		shelterImage:
			'https://pbs.twimg.com/profile_images/1125350743/CI_main_signature_symbol_logo02_400x400.jpg',
		email: '1588-1940',
		donation: 199000,
		name: '집다운 집으로 모금',
		age: '3',
		abandonDate: '2020.01.05~2020.03.31',
		likes: '50',
		interests: '21',
		comments: '13',
		image: 'https://www.childfund.or.kr/resources/mobile/microCampaign/cpView10000452/images/img_sec01.jpg',
	},
	{
		number: 4,
		shelterName: '굿네이버스',
		shelterImage:
			'https://scontent-icn1-1.xx.fbcdn.net/v/t1.0-9/10686841_959419480753308_5027192555934130822_n.png?_nc_cat=1&_nc_ohc=8AxJB2VIsyEAX9fqafk&_nc_ht=scontent-icn1-1.xx&oh=51ec40fe900e148730f180b1794923e5&oe=5E9FF7B1',
		email: '1544-7944',
		donation: 699000,
		name: '희망학교 지원 사업',
		age: '3',
		abandonDate: '2020.01.05~2020.03.31',
		likes: '150',
		interests: '211',
		comments: '63',
		image: 'http://gni.kr/ckeditorUpload/images/if12_01_4.jpg',
	},
	{
		number: 5,
		shelterName: '월드비전',
		shelterImage:
			'https://m.worldvision.or.kr/images/common/thumb_vi.png?v=1709',
		email: '02-2078-7000',
		donation: 855000,
		name: '아침머꼬',
		age: '3',
		abandonDate: '2020.01.15~2020.03.01',
		likes: '40',
		interests: '11',
		comments: '8',
		image: 'http://m.worldvision.or.kr/story/wp-content/uploads/2017/04/breakfast_mobile_01.jpg',
	},
	{
		number: 6,
		shelterName: '밀알복지재단',
		shelterImage:
			'https://s3.ap-northeast-2.amazonaws.com/media.linkareer.com/activity_manager/logo/2017-09-051049014344690_%EA%B5%AD%EB%AC%B8_%EC%BD%94%ED%8D%BC%EB%A6%AC%ED%8A%B8%EB%A7%88%ED%81%AC_%EB%A1%9C%EA%B3%A0%EB%A7%8C_.jpg',
		email: '1588-1940',
		donation: 56000,
		name: '저소득 독거노인 지원',
		age: '3',
		abandonDate: '2020.01.16~2020.03.01',
		likes: '31',
		interests: '17',
		comments: '3',
		image: 'http://www.miral.org/upload/editor/20190130KQSLUU6WGUGZVGIW9334U7R1.jpg',
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
					<Ionicons name={'ios-menu'} size={35} color={'#49B9FB'} />
				</TouchableOpacity>
			),
			headerRight: (
				<TouchableOpacity style={{ padding: 5, paddingRight: 15 }}>
					<Ionicons name={'ios-search'} size={35} color={'#49B9FB'} />
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
