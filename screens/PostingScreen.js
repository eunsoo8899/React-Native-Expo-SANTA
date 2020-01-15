import React, { Component } from 'react';
import {
	Text,
	View,
	StyleSheet,
	Keyboard,
	Image,
	Button,
	SafeAreaView,
	TouchableWithoutFeedback,
	Alert
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import RoundButton from '../components/RoundButton';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import Modal from 'react-native-modal';
import CancelButton from '../components/CancelButton'

export default class PostingScreen extends Component {
	state = {
		isModalVisible: false
	};

	constructor(props) {
		super(props);
		this.state = {
			image: ''
		};
	}

	async componentDidMount() {
		let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
	}

	snapPicture = async () => {
		pic = await ImagePicker.launchCameraAsync();
		console.log(pic);
		this.setState({ image: pic });
	};
	getPicture = async () => {
		pic = await ImagePicker.launchImageLibraryAsync();
		console.log(pic);
		this.setState({ image: pic });
	};

	toggleModal = () => {
		this.setState({ isModalVisible: !this.state.isModalVisible });
	};

	static navigationOptions = ({ navigation }) => {
		const params = navigation.state.params || {};
		return {
			headerRight: <CancelButton onPress={() => navigation.navigate("Home")} />,
			title: "새 게시글",
			headerTitleStyle: {
				textAlign: "center",
				flex: 1,
				fontSize: 20
			}
		};
	};

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View style={{ flex: 1 }}>
						<View style={styles.userInfo}>
							<Image
								style={styles.profilePic}
								source={{
									uri:
										'http://www.santavision.net/images/user/logo-login.png'
								}}
							/>
							<Text style={styles.name}>Santa</Text>
						</View>
						<View style={styles.postingBox}>
							<Text
								style={{
									fontSize: 20,
									color: 'red',
									textAlign: 'center',
									marginTop: 20,
									marginBottom: 35
								}}
							>
								사진이나 영상을 올려주세요
							</Text>
							<TouchableOpacity onPress={this.toggleModal}>
								<Ionicons
									name={'ios-add-circle'}
									size={80}
									color="red"
									style={{ textAlign: 'center' }}
								/>
								<Modal isVisible={this.state.isModalVisible}>
									<View style={styles.postingBox2}>
										<Button
											title="취소 하기"
											onPress={this.toggleModal}
											color="tomato"
										/>
										<View style={styles.buttonArray}>
											<TouchableOpacity
												style={styles.placingButton}
											>
												<Ionicons
													onPress={this.getPicture}
													name={'ios-images'}
													size={80}
													color={'tomato'}
												/>
												<Text
													style={{
														fontSize: 25,
														paddingTop: 10
													}}
												>
													불러 오기
												</Text>
											</TouchableOpacity>
										</View>
										<View style={styles.buttonArray}>
											<TouchableOpacity
												style={styles.placingButton}
											>
												<Ionicons
													onPress={this.snapPicture}
													name={'ios-camera'}
													size={110}
													color={'tomato'}
												/>
												<Text style={{ fontSize: 25 }}>
													사진 찍기
												</Text>
											</TouchableOpacity>
										</View>
									</View>
								</Modal>
							</TouchableOpacity>
						</View>
						<View
							style={{
								height: 200,
								fontSize: 20,
								margin: 15,
								marginTop: 20,
								marginBottom: 20
							}}
						>
							<TextInput
								placeholder="글을 입력해주세요."
								style={{ fontSize: 18 }}
								multiline={true}
								onChangeText={(text) =>
									this.setState({ content: text })}
								maxLength={500}
							/>
						</View>
						<View
							style={{
								marginTop: 'auto',
								justifyContent: 'flex-end',
								padding: 15
							}}
						>
							<TouchableOpacity
								onPress={() => Alert.alert('글을 게시 하시겠습니까?', '', [

									{ text: 'OK', onPress: () => Alert.alert('글을 게시했습니다.') },
									{ text: 'Cancel', onPress: () => Alert.alert('게시를 취소했습니다.') },
								])}
							>
								<RoundButton
									iconName={'ios-add'}
									title={'글 올리기'}
								/>
							</TouchableOpacity>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	postingBox: {
		height: 220,
		backgroundColor: 'mistyrose'
	},
	name: {
		paddingLeft: 10

	},
	userInfo: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	profilePic: {
		width: 50,
		height: 50,
		borderRadius: 25,
		marginTop: 11,
		marginBottom: 11,
		marginLeft: 20
	},
	name: {
		paddingLeft: 10,
		fontSize: 18,
		marginTop: 10,
		marginBottom: 10
	},
	postingBox2: {
		height: 350,
		backgroundColor: 'floralwhite',
		flexDirection: 'column-reverse'
	},
	buttonArray: {
		flex: 1,
		alignItems: 'center'
	},
	placingButton: {
		alignItems: 'center',
		paddingTop: 10
	},
	container: {
		flex: 1
	}
});
