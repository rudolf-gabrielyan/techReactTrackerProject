import React from 'react';
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import './TechUsageMap.scss';

const geoUrl = 'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

const TechUsageMap = ({setTooltipContent, locations}) => {

    const calculateOpacityFromTechUsage = techUsageCount => {
        let opacity = 0.2;

        if(techUsageCount) {
            if(techUsageCount > 0 && techUsageCount <= 500) opacity = 0.4;
            if(techUsageCount > 500 && techUsageCount <= 1000) opacity = 0.5;
            if(techUsageCount > 1000 && techUsageCount <= 2000) opacity = 0.6;
            if(techUsageCount > 2000 && techUsageCount <= 10000) opacity = 0.7;
            if(techUsageCount > 10000 && techUsageCount <= 12000) opacity = 0.8;
            if(techUsageCount > 12000 && techUsageCount <= 14000) opacity = 0.9;
            if(techUsageCount > 14000) opacity = 1;
        }else {
            techUsageCount = 0;
        };

        return { opacity, techUsageCount }
    };

    return(
        <>
            <ComposableMap data-tip="" projectionConfig={{ scale: 0 }}>
                <Geographies geography={geoUrl}>
                    {
                        ({ geographies }) =>
                            geographies.map(geo => {
                                const techUsageData = calculateOpacityFromTechUsage(locations[geo.properties.NAME]);
                                return <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            onMouseEnter={() => {
                                                const { NAME } = geo.properties;
                                                setTooltipContent(`${NAME} — ${techUsageData.techUsageCount} companies`);
                                            }}
                                            onMouseLeave={() => setTooltipContent("")}
                                            style={{
                                                default: {
                                                    fill: '#16a6ba',
                                                    outline: "none",
                                                    opacity: techUsageData.opacity,
                                                },
                                                hover: {
                                                    fill: '#3898DE',
                                                    outline: "none",
                                                },
                                                pressed: {
                                                    fill: '#3898DE',
                                                    outline: "none",
                                                }
                                            }}
                                        />
                            })
                    }
                </Geographies>
            </ComposableMap>
        </>
    )
}

export default TechUsageMap