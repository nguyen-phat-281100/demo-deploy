import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

// component ui
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { actFetchAllTheaterSystem } from './modules/actions'

//moment
import moment from 'moment'

//swal
import Swal from 'sweetalert2'

import { Collapse } from 'antd';

const { Panel } = Collapse;
const useStyles = makeStyles((theme) => ({
    formControl: {
        padding: theme.spacing(1),
    },
    
}));

export default function Theater(props) {
    const history = useHistory()
    const classes = useStyles();
    const { theaterSystem } = useSelector(state => state.theaterReducer)
    const [state, setState] = React.useState({
        system: {},
        theater: {},
        movie: {},
        date: {}
    })

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(actFetchAllTheaterSystem())
    }, [])

    const createTheaterSystemOptions = () => {
        return theaterSystem?.map((item, index) => {
            return (
                <MenuItem
                    value={item}
                    onClick={() => setState({
                        ...state,
                        system: item,
                        theater: item.lstCumRap[0],
                        movie: item.lstCumRap[0].danhSachPhim[0],
                        date: item.lstCumRap[0].danhSachPhim[0].lstLichChieuTheoPhim[0]
                    })}
                >
                    {item.tenHeThongRap}
                </MenuItem>
            )
        })
    }
    const createTheaterOptions = () => {
        return state.system.lstCumRap?.map((item, index) => {
            return (
                <MenuItem
                    value={item}
                    onClick={() => setState({
                        ...state,
                        theater: item,
                        movie: item.danhSachPhim[0],
                        date: item.danhSachPhim[0].lstLichChieuTheoPhim[0]
                    })}
                >
                    {item.tenCumRap}
                </MenuItem>
            )
        })
    }
    const createMovieOptions = () => {
        return state.theater.danhSachPhim?.map((item, index) => {
            return (
                <MenuItem
                    value={item}
                    onClick={() => setState({
                        ...state,
                        movie: item,
                        date: item.lstLichChieuTheoPhim[0]
                    })}
                >
                    {item.tenPhim}
                </MenuItem>
            )
        })
    }

    const createDateOptions = () => {
        return state.movie.lstLichChieuTheoPhim?.map((item, index) => {
            return (
                <MenuItem value={item} onClick={() => setState({
                    ...state, date: item
                })}>{moment(item.ngayChieuGioChieu).format('hh:mm, DD-MM-YYYY')}</MenuItem>
            )
        })
    }
    const resetOption = (e) => {

    }
    return (
        <div className="Theater" style={{marginTop: "20px"}}>
            <Collapse accordion>
                <Panel header="Ch???n v??" className="text-left" style={{fontWeight: "bold"}}>
                    <div style={{ marginTop: "20px" }}>
                        <div className="row">
                            <FormControl variant="outlined" className={classes.formControl + " col-sm-2"}>
                                <InputLabel id="demo-simple-select-label">H??? th???ng r???p</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={state.system}
                                    onChange={resetOption}
                                >
                                    {createTheaterSystemOptions()}
                                </Select>
                            </FormControl>
                            <FormControl variant="outlined" className={classes.formControl + " col-sm-2"}>
                                <InputLabel id="demo-simple-select-label">C???m r???p</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={state.theater}
                                >
                                    {createTheaterOptions()}
                                </Select>
                            </FormControl>
                            <FormControl variant="outlined" className={classes.formControl + " col-sm-2"}>
                                <InputLabel id="demo-simple-select-label">Phim</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={state.movie}
                                >
                                    {createMovieOptions()}
                                </Select>
                            </FormControl>
                            <FormControl variant="outlined" className={classes.formControl + " col-sm-2"}>
                                <InputLabel id="demo-simple-select-label">Ng??y Chi???u</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={state.date}
                                >
                                    {createDateOptions()}
                                </Select>
                            </FormControl>
                            <button 
                                className="button__booking col-sm-1" 
                                onClick={
                                    () => {
                                        if(state.date.maLichChieu === undefined){
                                            Swal.fire(
                                                '',
                                                'B???n ch??a ch???n l???ch chi???u?',
                                                'question'
                                            )
                                        }else{
                                            history.push(`checkout/${state.date.maLichChieu}`)
                                        }
                                    }}
                            >
                                ?????t v??
                            </button>
                        </div>

                    </div>
                </Panel>
            </Collapse>
        </div>


    );
}
