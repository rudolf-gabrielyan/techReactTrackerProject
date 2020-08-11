import React from 'react';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import moment from 'moment';
import './CompanyTechChanges.scss';
import 'react-vertical-timeline-component/style.min.css';

import Image from '../Image/Image';

import formatFirstLetter from '../../helpers/formatFirstLetter';

const CompanyTechChanges = ({ company }) => {
    return(
        <div className='companyTechChangesContainer'>
            <div><p>Recent Technology Changes in {formatFirstLetter(company.domain)}</p></div>
            {
                company.technologyChanges.length !== 0 && (
                    <VerticalTimeline className='verticalTimeline'>
                        {
                            company.technologyChanges.map((technologyChange, index) => {
                                return(
                                    <VerticalTimelineElement
                                        key={index}
                                        className='verticalTimelineElement'
                                        date={moment(technologyChange.date).fromNow()}
                                        iconStyle={{ backgroundColor: '#586EBB', width: '25px', height: '25px', boxShadow: 'none', top: '4px' }}
                                        position='right'
                                        contentArrowStyle={{display: 'none'}}
                                        contentStyle={{backgroundColor:'inherit'}}
                                    >
                                        {
                                            technologyChange.changes.map((change, index) => {
                                                const color = change.event === 'added' ? '#42C960' : '#BA2020';
                                                const iconClassName = change.event === 'added' ? "fas fa-plus" : "fas fa-minus";
                                                const eventText = change.event === 'added' ? 'Added' : 'Removed';
                                                return(
                                                    <div key={index}>
                                                        <div>
                                                            <Image src={change.image_url} />
                                                            <span style={{backgroundColor: color}}>
                                                                <i className={iconClassName}/>
                                                            </span>
                                                        </div>
                                                        <p><span style={{color: color}}>{eventText}</span> {change.name}</p>
                                                    </div>
                                                )
                                            })
                                        }                                
                                    </VerticalTimelineElement>
                                )
                            })
                        }                      
                    </VerticalTimeline>
                )
            }
            <div>
                <button>
                    <i className="fas fa-bullseye" /><span>Track Changes</span>
                </button>
            </div>
        </div>
    )
}

export default CompanyTechChanges