import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { Platform } from 'react-native';

export default () => {
    Promise.all([
        Icon.getImageSource(Platform.OS === 'android' ? 'md-map' : 'ios-map', 30),
        Icon.getImageSource(Platform.OS === 'android' ? 'md-share-alt' : 'ios-share', 30),
        Icon.getImageSource(Platform.OS === 'android' ? 'md-menu' : 'ios-menu', 30),
    ]).then(sources => {
        Navigation.setRoot({
            root: {
                sideMenu: {
                    left: {
                        component: {
                            name: 'exploreit.SideMenu',
                            id: 'sideMenu',
                            options: {
                                text: 'SideMenu',
                                topBar: {
                                    
                                }
                            }
                        }
                    },
                    center: {
                        stack: {
                            id: 'MainTabRoot',
                            children: [{
                                bottomTabs: {
                                    children: [
                                        {
                                            stack: {
                                                children: [
                                                    {
                                                        component: {
                                                            id: 'sharePlace',
                                                            name: 'exploreit.SharePlace',
                                                            options: {
                                                                bottomTab: {
                                                                    text: 'Share Place',
                                                                    icon: sources[0] 
                                                                }
                                                            }
                                                        }
                                                    }
                                                ],
                                                options: {
                                                    topBar: {
                                                        // visible: false,
                                                        // drawBehind: true
                                                        title: {
                                                            text: 'Share Place'
                                                        },
                                                        leftButtons: [
                                                            {
                                                                id: 'toggleSideMenu',
                                                                icon: sources[2]
                                                            }
                                                        ]
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            stack: {
                                                children: [
                                                    {
                                                        component: {
                                                            id: 'findPlace',                                            
                                                            name: 'exploreit.FindPlace',
                                                            options: {
                                                                bottomTab: {
                                                                    text: 'Find Place',
                                                                    icon: sources[1] 
                                                                }
                                                            }
                                                        }
                                                    }
                                                ],
                                                options: {
                                                    topBar: {
                                                        title: {
                                                            text: 'Find Place'
                                                        },
                                                        leftButtons: [
                                                            {
                                                                id: 'toggleSideMenu',
                                                                icon: sources[2]
                                                            }
                                                        ]
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                }
                            }]
                        }
                    }
                },
            }
        })
    })
    
}
