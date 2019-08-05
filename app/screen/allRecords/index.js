import React, { Component } from 'react';
import { View,
         Text,
         FlatList } from 'react-native';
import Moment from 'moment'
import { ChangeSelect } from '../../components/selection';
import { LinkButton } from '../../components/button';
import Records from './components/Records';
import DataBase from '../../data/dataBase';
import { LoadingPage } from '../../components/loading';
import styles from './styles';
import { SECONDARY_COLOR_LIGHT } from '../../config/colors';


class AllRecords extends Component {

    static navigationOptions = {
        title: 'Toutes les Transactions',
    }

    state = {
        db: new DataBase(),
        loadingRecords: true,
        selectArrangeTime: 0,// 0: day, 1: week, 2: month, 3: year
        records: [],
        recordsArrange: []
    }

    getParam = () => {
        const { navigation } = this.props;
        const idAccount = navigation.getParam('idAccount', null)
        return ({idAccount: idAccount})
    }

    componentDidMount(){
        const { navigation } = this.props
        this.focusListener = navigation.addListener('didFocus', () => {
            this.fetchAllRecords()
        });
    }

    componentWillUnmount() {
        // Remove the event listener before removing the screen from the stack
        this.focusListener.remove();
    }

    arrangeByDay = () => {
        let { records } = this.state;
        records.sort((a,b) => new Moment(b.date, 'DDMMYYYY') -  new Moment(a.date, 'DDMMYYYY'))
        let arrangeRecords = [];
        
        for (let i = 0; i < records.length; i++) {
            let recordsArr = {
                title : records[i].date,
                records: []
            }
            let stop = i;
            for (let u = 0 ; u < records.length; u++) {
                if (records[i].date === records[u].date) {
                    recordsArr.records.push(records[u])
                    stop = u;
                } 
            }

            arrangeRecords.push(recordsArr);
            i += stop;
        }

        this.setState({recordsArrange: arrangeRecords});
    }
    
    arrangeByWeek = () => {
        let { records } = this.state;
        records.sort((a,b) => new Moment(b.date, 'DDMMYYYY') -  new Moment(a.date, 'DDMMYYYY'))
        let arrangeRecords = [];
        let dateStart = '';
        let dateEnd = '';
        
        for (let i = 0; i < records.length; i++) {
            const dateVerify = new Moment(records[i].date).isoWeek()
    
            dateStart = new Moment(records[i].date)
            dateEnd = new Moment(records[i].date)

            let recordsArr = {
                title : `${dateStart.format('DD/MM/YYYY', 'fr')} - ${dateEnd.format('DD/MM/YYYY', 'fr')}`,
                records: []
            }
            
            let stop = i;
            for (let u = 0 ; u < records.length; u++) {
                if ( new Moment(records[u].date).isoWeek() === dateVerify) {
                    dateEnd = new Moment(records[u].date)
                    if (dateEnd.isAfter(dateStart)) dateEnd = dateStart
                    else if(dateEnd.isBefore(dateStart)) dateStart = dateEnd ;
                         
                    recordsArr.records.push(records[u])
                    stop = u;
                } 
            }
            
            arrangeRecords.push(recordsArr);
            i += stop;
        }

        this.setState({recordsArrange: arrangeRecords});
    }

    arrangeByMonth = () => {
        let { records } = this.state;
        records.sort((a,b) => new Moment(b.date, 'DDMMYYYY') -  new Moment(a.date, 'DDMMYYYY'))
        let arrangeRecords = [];
        
        for (let i = 0; i < records.length; i++) {
            const dateVerify = new Moment(records[i].date).month()

            let recordsArr = {
                title : new Moment(records[i].date).format('MMM'),
                records: []
            }
            let stop = i;
            for (let u = 0 ; u < records.length; u++) {
                if (new Moment(records[i].date).month() === dateVerify) {
                    recordsArr.records.push(records[u])
                    stop = u;
                } 
            }

            arrangeRecords.push(recordsArr);
            i += stop;
        }

        this.setState({recordsArrange: arrangeRecords});
    }

    arrangeByYear = () => {
        let { records } = this.state;
        records.sort((a,b) => new Moment(b.date, 'DDMMYYYY') -  new Moment(a.date, 'DDMMYYYY'))
        let arrangeRecords = [];
        
        for (let i = 0; i < records.length; i++) {
            const dateVerify = new Moment(records[i].date).year()

            let recordsArr = {
                title : new Moment(records[i].date).format('YYYY'),
                records: []
            }
            let stop = i;
            for (let u = 0 ; u < records.length; u++) {
                if (new Moment(records[i].date).year() === dateVerify) {
                    recordsArr.records.push(records[u])
                    stop = u;
                } 
            }

            arrangeRecords.push(recordsArr);
            i += stop;
        }

        this.setState({recordsArrange: arrangeRecords});
    }

    arrangeTime = (select) => {
        switch(select) {
            case 0: 
                this.arrangeByDay();
                break;
            case 1: 
                this.arrangeByWeek();
                break;
            case 2: 
                this.arrangeByMonth();
                break;
            case 3: 
                this.arrangeByYear();
                break;
        }
    }

    fetchAllRecords = () => {

        const { idAccount } = this.getParam();// get idAccound

        if (idAccount !== null) {
            if (idAccount === 'all') {
                this.state.db.getAllRecords().then(res => {
                    this.setState({loadingRecords: false, records: res})
                    this.arrangeTime(0)
                })
            } else {
                this.state.db.getRecordsBuyAccount(idAccount).then(res => {
                    this.setState({loadingRecords: false, records: res})
                    this.arrangeTime(0)
                })
            }
        } else {
            this.setState({loadingRecords: false})
        }     
    }

    onClickRecord = (id, transfert) => {
        let  screen = 'AddRecord';
        if (transfert) {
           screen = 'Transfert';
        }

        this.props.navigation.navigate(screen, {
            idRecord: id
        }) 
    }

    render() {

        const { loadingRecords,
                recordsArrange } = this.state;

        return (
            <View style = {styles.container}>
                <View style = {styles.navBalance}>
                    <ChangeSelect
                        color = {SECONDARY_COLOR_LIGHT}
                        data = { ['Jour', 'Semaine', 'mois', 'année'] }
                        onClick = {this.arrangeTime}
                    />
                    <View style = {styles.balance}>
                        <Text style = {styles.textBalance}>Balance: </Text>
                        <Text style = {styles.textBalance}>4000</Text>
                        <Text style = {styles.textBalance}> CFA</Text>
                    </View>
                </View>
                <View style = {styles.navFilter}>
                    <LinkButton
                        onPress = {() => {}}
                        label = 'Filtre Option'
                        size = {14} 
                    />
                </View>
                <FlatList
                    data = {recordsArrange}
                    horizontal = {false}
                    renderItem = {({item, index}) => <Records
                                                        title = {item.title}
                                                        key = {`${index}`}
                                                        devise = "FCFA"
                                                        data = {item.records}
                                                        handleClickItem = {this.onClickRecord} 
                                                     />
                                 }
                />
                <LoadingPage
                     show = {loadingRecords}
                />
            </View>
        )
    }
}

export default AllRecords