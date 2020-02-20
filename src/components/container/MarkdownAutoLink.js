import React, { useCallback, useEffect, useState } from 'react';
import Anchor from '../presentaitional/Anchor';

const filterAnchorDetails = anchors => {
    let last_depth = 0;
    anchors = [].slice.call(anchors).map(anchor => {
        let depth = parseInt(anchor.parentElement.nodeName[1]);
        if (last_depth !== 0 && depth > last_depth) depth = last_depth + 1;
        last_depth = depth
        return ({
            href: "#"+ anchor.parentElement.id,
            title: anchor.parentElement.innerText,
            depth: depth,
            children: []
        });
    });
    constructTree(anchors);
    return anchors;
}

const constructTree = list => {
    let deleteNode = [];
    for (let i = 0; i < list.length; i++) {
      for (let j = i+1; j < list.length; j++) {
        if (list[i].depth + 1 === list[j].depth) {
            list[i].children.push(list[j]);
            deleteNode.push(j);
        }
        else if (list[i].depth >= list[j].depth) break;
      } 
    }
    deleteNode.sort((a,b)=>b-a).forEach(index => list.splice(index,1));
}

export default () => {
    const [anchors, setAnchors] = useState([]);

    const getAnchorItems = useCallback((anchorList) => {
        return anchorList.map((anchor) => {
            if (anchor.children.length > 0) {
                return (
                    <Anchor
                        title={anchor.title}
                        href={anchor.href}
                    >
                        {getAnchorItems(anchor.children)}
                    </Anchor>
                );
            }
            return (
                <Anchor title={anchor.title} href={anchor.href}/>
            );
        });
    }, []);

    useEffect(() => {
        const anchorElements = document.getElementsByClassName('markdown-header-auto-link');
        if (anchorElements) {
            setAnchors(filterAnchorDetails(anchorElements));
        }
    }, []);

    return (
        <div>
            {getAnchorItems(anchors)}
        </div>
    );
};
