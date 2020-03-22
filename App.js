import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const App = () => {
    const [state, setState] = useState({
        image: null
    })

    const openGallery = () => {
        ImagePicker.openPicker({
            width: 400,
            height: 400,
            cropping: true,
            multiple: true
        }).then(image => {
            console.log('우리가 가져온 이미지 =====>', image)
            let images = []
            image.map((image) => {
                let img = {
                    uri: image.path,
                    name: `image.${image.path.split('.')[1]}`,
                    width: image.width,
                    height: image.height,
                    mime: image.mime,
                    type: image.mime,
                }
                images.push(img)
            })

            setState(prev => ({ ...prev, image: [...images] }))
        })
    }


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginHorizontal: 10 }}>
            {
                state.image ?
                    <View style={{ flexDirection: "row", flexWrap: 'wrap' }}>
                        {
                            state.image.map((e) => (
                                <TouchableOpacity
                                    style={{ marginRight: 5 }}
                                    onPress={() => openGallery()}>
                                    <Image source={{ uri: e.uri }} style={{ width: 80, height: 80 }} resizeMode='cover' />
                                </TouchableOpacity>
                            ))
                        }
                    </View>

                    :
                    <TouchableOpacity onPress={() => openGallery()}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>이미지를 골라주세요.</Text>
                    </TouchableOpacity>
            }
        </View>
    )
};

export default App;