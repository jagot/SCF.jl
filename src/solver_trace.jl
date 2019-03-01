# * Energy

mutable struct EnergyColumn{T<:AbstractFloat} <: TraceColumn
    E::T
    fmt::FormatExpr
    header::String
    eV::Bool
end

function EnergyColumn(E::T, eV::Bool=true, header="Energy") where T
    fmt = if eV
        FormatExpr("{1:+10.5f} Ha = {2:+10.5f} eV")
    else
        FormatExpr("{1:+10.5f} Ha")
    end
    EnergyColumn(E, fmt,
                 rpad(header, 1+length(eV ? format(fmt, E, E) : format(fmt, E))), eV)
end

(e::EnergyColumn)(::Integer) =
    e.eV ? (e.E,27.211e.E) : (e.E,)

# * Virial theorem

mutable struct VirialColumn{T<:AbstractFloat} <: TraceColumn
    V::T
    fmt::FormatExpr
    lc::LinearColorant{T}
    header::String
end

function VirialColumn(V::T) where T
    fmt = FormatExpr("{1:.5f} ({2:s}{3:.2f}×10{4:3s}$(crayon"reset"))")
    lc = LinearColorant(one(T),zero(T),SolverTraces.red_green_scale())
    VirialColumn(V, fmt, lc,
                 rpad("V/T     V/T + 2", 1+length(format(fmt, V, "", base_exp(abs(V + 2.0))...))))
end

function (v::VirialColumn{T})(::Integer) where T
    Vb,Ve = base_exp(abs(v.V + 2.0))
    (v.V, v.lc(100abs.(log10(2.0)-log10(abs(v.V)))/log10(2.0)),
     Vb,to_superscript(Ve))
end

# * Relaxation

mutable struct RelaxationColumn{T<:AbstractFloat} <: TraceColumn
    ω::T
    fmt::FormatExpr
    header::String
end

function RelaxationColumn(ω::T) where T
    header = "1-ω"
    fmt = FormatExpr("{1:.2f}×10{2:3s}")
    RelaxationColumn(ω, fmt,
                     rpad(header, 1+length(format(fmt, base_exp(abs(1.0 - ω))...))))
end

function (r::RelaxationColumn{T})(::Integer) where T
    ωb,ωe = base_exp(abs(1.0 - r.ω))
    (ωb,to_superscript(ωe))
end
