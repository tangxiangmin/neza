/**
 * 2019-07-31 15:09
 * 渲染DOM节点
 */

import {createFiberRoot, Fiber} from '../reconciler/fiber'
import {scheduleWork} from '../reconciler'
import {VNode} from "../virtualDOM/h";

function isValidAttr(name) {
    return !['children', 'key'].includes(name)
}

function updateProperty(element: any, name: string, value: any, newValue: any) {
    let whiteList = ['children']
    if (name === 'style') {
        for (let key in newValue) {
            let style = !newValue || !newValue[key] ? '' : newValue[key]
            element[name][key] = style
        }
    } else if (name.indexOf('on') > -1) {
        name = name.slice(2).toLowerCase()
        if (value) {
            element.removeEventListener(name, value)
        }
        element.addEventListener(name, newValue)
    } else if (isValidAttr(name)) {
        element.setAttribute(name, newValue)
    }
}

export function updateElement(element: any, props: any, newProps: any) {
    if (!newProps) {
        return
    }
    Object.keys(newProps).forEach(key => {
        if (key === 'nodeValue') {
            // 处理文本节点
            element[key] = newProps[key]
        } else {
            // 处理其他值
            updateProperty(element, key, props[key], newProps[key])
        }
    })
}

// export function appendAllChildren(fiber) {
//     let firstChild = fiber.child
//     let element = fiber.stateNode
//     while (firstChild) {
//         if (firstChild.parentNode !== element) {
//             element.appendChild(firstChild.stateNode)
//         }
//
//         firstChild = firstChild.sibling
//     }
// }

export function createElement(fiber: Fiber) {
    const {vnode} = fiber;
    const {type, props} = vnode

    const element =
        type === "text"
            ? document.createTextNode('')
            : document.createElement(<string>type);

    updateElement(element, {}, props);
    return element;
}


function clearContainer(container: any) {
    let rootSibling;
    while ((rootSibling = container.lastChild)) {
        container.removeChild(rootSibling);
    }
}

/**
 *
 * @param vnode
 * @param el
 * 从组件树根节点开始，依次渲染子节点，然后将其挂载到父节点上
 */
function render(vnode: VNode, el: any) {
    clearContainer(el)
    let rootFiber = createFiberRoot(vnode, el)
    scheduleWork(rootFiber)
}

export default render