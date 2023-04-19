import './css/Tooltip.css'

export default function Tooltip({ label, children }) {
    return(
        <div className='tooltip'>
            {label && <span className="tooltiptext">{label}</span>}
            {children}
        </div>
    )
}
