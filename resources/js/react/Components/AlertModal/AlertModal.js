import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import './AlertModal.scss';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import MobileStepper from '@material-ui/core/MobileStepper';

import ReactSwitch from './ReactSwitch/ReactSwitch';
import CustomPopover from './CustomPopover/CustomPopover';

import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

import { setCountries, setIndustries, getSearchedIndustries, setEmployeesCount, getSearchedTechnologiesForSelect, setTechnology, setAlertName, setFeatureEnabled, saveAlert } from '../../redux/actions/createAlertActions';

import getLabelForCreatedAlertOption from '../../helpers/getLabelForCreatedAlertOption';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(67,103,125,0.7)',
    },
    paper: {
        backgroundColor:'#FFFFFF',
        '-webkit-box-shadow': '0px 0px 51px -20px rgba(255,255,255,1)',
        '-moz-box-shadow': '0px 0px 51px -20px rgba(255,255,255,1)',
        boxShadow: '0px 0px 51px -20px rgba(255,255,255,1)',
        position: 'relative',
        padding: '53px 0 45px 0',
        width: '60%',
        '@media (max-width: 800px)' : {
            width: '100%',
        },
    },
    header: {
        margin: '0 0 68px 0',
        fontWeight: 'bold',
        fontSize: '1.6rem',
        color: '#000000',
        display: 'flex',
        alignItems: 'center'
    },
    headerSpan: {
        backgroundColor: '#3898DE',
        marginRight: '16px',
        width: '38px',
        height: '46px',
        display: 'inline-block',
    },
    contentContainer: {
        paddingLeft: '63px',
        marginBottom: '110px',
        '@media (max-width:800px)': {
            paddingLeft: '30px !important',
            marginBottom: '50px',
        },
        '@media (max-width:400px)': {
            paddingLeft: '10px !important',
            marginBottom: '30px',
        },
    },
    contentP: {
        fontWeight: 'bold',
        fontSize: '1.6rem',
        color: '#000000',
        margin: 0,
    },
    contentSpan: {
        color: '#3898DE',
        cursor: 'pointer',
        transitionDuration: '0.4s',
        '&:hover' : {
            backgroundColor: 'lightgrey'
        }
    },
    contentFooterP: {
        fontSize: '0.9rem',
        color: '#000000',
        margin: '45px 0 0 0',
    },
    secondContentContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '22px',
    },
    secondContentP: {
        fontWeight: '500',
        fontSize: '1rem',
        color: '#000000',
        margin: 0,
    },
    secondContentPExtra: {
        width: '226px',
        '@media (max-width: 1000px)' : {
            width: '200px'
        },
        '@media (max-width: 900px)' : {
            width: '160px',
        },
        '@media (max-width: 600px)' : {
            width: '145px',
        },
        '@media (max-width: 400px)' : {
            width: '120px',
        },
    },
    secondContentSpan: {
        color: '#3898DE',
    },
    alertNameInput: {
        width: '50%',
        maxWidth: '436px',
        height: '52px',
        backgroundColor: '#FFFFFF',
        border: '1px solid #C4C4C4',
        paddingLeft: '14px',
        fontSize: '1rem',
        outline: 'none',
        '@media (max-width: 1000px)' : {
            height: '35px'
        },
    },
    stepper: {
        paddingRight: '89px',
        paddingLeft: '59px',
        '@media (max-width:800px)': {
            paddingLeft: '30px',
            paddingRight: '10px',
        },
        '@media (max-width:400px)': {
            paddingLeft: '10px',
        },
    },
    stepperButton: {
        backgroundColor: '#3898DE',
        borderRadius: '6px',
        fontSize: '0.7rem',
        color: '#FFFFFF',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        width: '145.62px',
        height: '36px',
        transitionDuration: '0.4s',
        '&:hover': {
            backgroundColor: '#1072b9',
        },
        '@media (max-width: 900px)' : {
            width: '98px'
        },        
        '@media (max-width: 700px)' : {
            width: '70px',
            height: '32px'
        },
        '@media (max-width: 500px)' : {
            width: '53px',
            height: '23px'
        }
    },
}));

const AlertModal = ({ setShowModal, createAlert, setCountries, getSearchedIndustries, setIndustries, setEmployeesCount, getSearchedTechnologiesForSelect, setTechnology, setAlertName, setFeatureEnabled, saveAlert }) => {
    const classes = useStyles();
    const technologyRef = useRef(null);
    const inputRef = useRef(null);
    const [activeStep, setActiveStep] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleNext = () => {
        if(activeStep === 0) {
            if(createAlert.selectedTechnology.name) {
                setActiveStep(prevActiveStep => prevActiveStep + 1);
            }else {
                forceToChooseTechnology();
            };
        }else {
            if(createAlert.alertName === '') {
                inputRef.current.style.borderColor = 'red';
                inputRef.current.focus();
            }else {
                saveAlert()
                .then(() => setShowModal(false));
            }
        };
    };

    const handleDotClick = event => {
        if(event.target.classList.contains('MuiMobileStepper-dot')) {
            for(let child = 0; child < event.target.parentElement.children.length; child++) {
                if(event.target.parentElement.children[child] === event.target) {
                    if(createAlert.selectedTechnology.name) {
                        setActiveStep(child);
                    }else {
                        forceToChooseTechnology();
                    };
                } ;
            };
        };
    };

    const forceToChooseTechnology = () => setAnchorEl(technologyRef.current);

    const handlePopover = event => setAnchorEl(event.target);

    const handlePopoverClose = () => setAnchorEl(null);

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={true}
            onClose={() => {}}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{timeout: 500}}
        >
            <Fade in={true}>
                <div className={classes.paper}>
                    <i className="fas fa-times" onClick={() => setShowModal(false)} style={{position: 'absolute', top: '9px', right: '11px', fontSize: '1rem', cursor: 'pointer', color: '#858585'}} />
                    <p className={classes.header} style={activeStep === 1 ? {marginBottom: '30px'} : null}><span className={classes.headerSpan}></span>Create a New Technology Alert</p>
                    <div className={classes.contentContainer} style={activeStep === 1 ? {marginBottom: '0'} : null, anchorEl ? {opacity: 0.3} : null}>
                        {
                            activeStep === 0 ?
                                <>
                                    <p className={classes.contentP}>Notify me when websites in <span id='countries' className={classes.contentSpan} style={{transitionDuration: 'inherit'}} onClick={handlePopover}>{getLabelForCreatedAlertOption(createAlert.selectedCountries)}</span></p>
                                    <p className={classes.contentP}>belonging to <span id='industries' className={classes.contentSpan} onClick={handlePopover}>{getLabelForCreatedAlertOption(createAlert.selectedIndustries)}</span></p>
                                    <p className={classes.contentP}>with <span id='range' className={classes.contentSpan} onClick={handlePopover}>{getLabelForCreatedAlertOption(createAlert.employeesCount)}</span></p>
                                    <p className={classes.contentP}>has started or stopped using <span id='techName' ref={technologyRef} className={classes.contentSpan} style={{color: '#b0adad'}} onClick={handlePopover}>{getLabelForCreatedAlertOption(createAlert.selectedTechnology)}</span></p>
                                    <p className={classes.contentFooterP}>*Click the blue highlighted terms to customize your alert</p>
                                </>
                                : 
                                <>
                                    <p className={classes.secondContentP} style={{marginBottom: '24px'}}> 
                                        Notify me when websites in <span className={classes.secondContentSpan}>{getLabelForCreatedAlertOption(createAlert.selectedCountries)}</span> belonging to <span className={classes.secondContentSpan}>{getLabelForCreatedAlertOption(createAlert.selectedIndustries)}</span> with <span className={classes.secondContentSpan}>{getLabelForCreatedAlertOption(createAlert.employeesCount)}</span> has started or stopped using <span className={classes.secondContentSpan}>{getLabelForCreatedAlertOption(createAlert.selectedTechnology)}</span>
                                    </p>
                                    <div className={classes.secondContentContainer}>
                                        <p className={classes.secondContentP + ' ' + classes.secondContentPExtra}>Name this Alert</p>
                                        <input type="text" ref={inputRef} className={classes.alertNameInput} placeholder="ALERT NAME" value={createAlert.alertName} onChange={event => setAlertName(event.target.value)} />
                                    </div>
                                    <div className={classes.secondContentContainer}>
                                        <p className={classes.secondContentP + ' ' + classes.secondContentPExtra}>Email Notifications</p>
                                        <ReactSwitch
                                            id='email'
                                            checked={createAlert.email}
                                            onChange={(checked, event, id) => setFeatureEnabled({ [id]: checked })}
                                        />
                                        <p className={classes.secondContentP}>Daily Email Notification</p>        
                                    </div>
                                    <div className={classes.secondContentContainer}>
                                        <p className={classes.secondContentP + ' ' + classes.secondContentPExtra}>Slack Notifications</p>
                                        <ReactSwitch
                                            id='slack'
                                            checked={createAlert.slack}
                                            onChange={(checked, event, id) => setFeatureEnabled({ [id]: checked })}
                                        />
                                        <p className={classes.secondContentP}>Instant Slack Notification</p>        
                                    </div>
                                    <div className={classes.secondContentContainer}>
                                        <p className={classes.secondContentP + ' ' + classes.secondContentPExtra}>Enabled</p>
                                        <ReactSwitch
                                            id='alert'
                                            checked={createAlert.alert}
                                            onChange={(checked, event, id) => setFeatureEnabled({ [id]: checked })}
                                        />
                                    </div>
                                </>
                        }
                    </div>
                    <div>
                        <MobileStepper
                            variant="dots"
                            steps={2}
                            position="static"
                            activeStep={activeStep}
                            onClick={handleDotClick}
                            className={classes.stepper}
                            nextButton={
                                <button className={classes.stepperButton} onClick={handleNext}>
                                    {activeStep === 1 ? 'Save Alert' : 'Continue'}
                                </button>
                            }
                        />
                    </div>
                    <CustomPopover
                        anchorEl={anchorEl}
                        handlePopoverClose={handlePopoverClose}
                        createAlert={createAlert}
                        setCountries={setCountries}
                        getSearchedIndustries={getSearchedIndustries}
                        setIndustries={setIndustries}
                        setEmployeesCount={setEmployeesCount}
                        getSearchedTechnologiesForSelect={getSearchedTechnologiesForSelect}
                        setTechnology={setTechnology}
                    />
                    <LoadingIndicator state={createAlert.isLoading} />
                </div>
            </Fade>
        </Modal>
    );
}

const mapStateToProps = state => ({
    createAlert: state.createAlert,
});

const mapDispatchToProps = dispatch => ({
    setCountries: selectedCountries => dispatch(setCountries(selectedCountries)),
    setIndustries: selectedIndustries => dispatch(setIndustries(selectedIndustries)),
    getSearchedIndustries: inputValue => dispatch(getSearchedIndustries(inputValue)),
    setEmployeesCount: employeesCount => dispatch(setEmployeesCount(employeesCount)),
    getSearchedTechnologiesForSelect: inputValue => dispatch(getSearchedTechnologiesForSelect(inputValue)),
    setTechnology: technology => dispatch(setTechnology(technology)),
    setAlertName: inputValue => dispatch(setAlertName(inputValue)),
    setFeatureEnabled: feature => dispatch(setFeatureEnabled(feature)),
    saveAlert: () => dispatch(saveAlert()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlertModal)