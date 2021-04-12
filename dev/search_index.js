var documenterSearchIndex = {"docs":
[{"location":"quantum_systems/#Quantum-Systems","page":"Quantum Systems","title":"Quantum Systems","text":"","category":"section"},{"location":"quantum_systems/","page":"Quantum Systems","title":"Quantum Systems","text":"A quantum system is here taken to be a collection of single-particle orbitals vecP, arranged into multiple configurations, and a set of mixing coefficients vecc. As an example, the helium ground state 1s² may be approximated a linear combination of Slater determinants:","category":"page"},{"location":"quantum_systems/","page":"Quantum Systems","title":"Quantum Systems","text":"beginequation\nPsi(textrm1s²) approx\nsum_i c_i Phi(gamma_i)\nendequation","category":"page"},{"location":"quantum_systems/","page":"Quantum Systems","title":"Quantum Systems","text":"where gamma_i denotes a configuration of single-electron orbitals and c_i its associated mixing coefficient. A low-order approximation may be achieved with the three Slater determinants formed from the 1s and 2s orbitals:","category":"page"},{"location":"quantum_systems/","page":"Quantum Systems","title":"Quantum Systems","text":"beginequation\nPhi(textrm1s²) quad\nPhi(textrm1s 2s) quad\nPhi(textrm2s²)\nendequation","category":"page"},{"location":"quantum_systems/","page":"Quantum Systems","title":"Quantum Systems","text":"Similar ideas can be employed for molecules, etc.","category":"page"},{"location":"quantum_systems/","page":"Quantum Systems","title":"Quantum Systems","text":"CurrentModule = SCF","category":"page"},{"location":"quantum_systems/","page":"Quantum Systems","title":"Quantum Systems","text":"AbstractQuantumSystem\ncoefficients(::AbstractQuantumSystem)\norbitals(::AbstractQuantumSystem)\ndiff(::AbstractQuantumSystem)\nnormalize!(::AbstractQuantumSystem)","category":"page"},{"location":"quantum_systems/#SCF.AbstractQuantumSystem","page":"Quantum Systems","title":"SCF.AbstractQuantumSystem","text":"AbstractQuantumSystem\n\nAny implementation of the AbstractQuantumSystem interface, used for self-consistent field calculations, must implement the functions coefficients, orbitals, diff, normalize!.\n\n\n\n\n\n","category":"type"},{"location":"quantum_systems/#SCF.coefficients-Tuple{AbstractQuantumSystem}","page":"Quantum Systems","title":"SCF.coefficients","text":"coefficients(quantum_system)\n\nRetrieves the mixing coefficients of quantum_system. Must return a view that the scf! routine can modify. To be overloaded by the implementation of AbstractQuantumSystem.\n\n\n\n\n\n","category":"method"},{"location":"quantum_systems/#SCF.orbitals-Tuple{AbstractQuantumSystem}","page":"Quantum Systems","title":"SCF.orbitals","text":"orbitals(quantum_system)\n\nRetrieves the orbitals of quantum_system. Must return a view that the scf! routine can modify. To be overloaded by the implementation of AbstractQuantumSystem.\n\n\n\n\n\n","category":"method"},{"location":"quantum_systems/#Base.diff-Tuple{AbstractQuantumSystem}","page":"Quantum Systems","title":"Base.diff","text":"diff(quantum_system[; kwargs...])\n\nVaries the the quantum_system with respect to all orbitals. Used to derive the multi-configurational Hartree–Fock equations. To be overloaded by the implementation of AbstractQuantumSystem.\n\n\n\n\n\n","category":"method"},{"location":"quantum_systems/#LinearAlgebra.normalize!-Tuple{AbstractQuantumSystem}","page":"Quantum Systems","title":"LinearAlgebra.normalize!","text":"normalize!(quantum_system, v)\n\nNormalize the orbital v of quantum_system. To be overloaded by the implementation of AbstractQuantumSystem.\n\n\n\n\n\n","category":"method"},{"location":"fock_operators/#Fock-Operators","page":"Fock Operators","title":"Fock Operators","text":"","category":"section"},{"location":"fock_operators/","page":"Fock Operators","title":"Fock Operators","text":"CurrentModule = SCF","category":"page"},{"location":"fock_operators/","page":"Fock Operators","title":"Fock Operators","text":"The Fock operator consists of an AbstractQuantumSystem and a set of coupled integro-differential equations, the solution of which is the objective of the self-consistent field procedure. For the solution process to work, the set of equations need to implement a few methods:","category":"page"},{"location":"fock_operators/","page":"Fock Operators","title":"Fock Operators","text":"It must fulfil Julia's iteration interface, i.e. each element must be the equation for a single orbital, which is solved independently from the other equations, but with the other orbitals as inputs.\nenergy_matrix! which calculates the energy matrix matH_i for orbital equation i, where vecc^HmatH_ivecc gives the orbital energy for the correspond orbital. The overall energy matrix matH=sum_imatH_i is used to solve the secular problem for the mixing coefficients.\nhamiltonian which returns the Hamiltonian corresponding to one orbital equation.\nupdate! which recomputes all orbital-dependent integrals, shared among the equations of the equation system.","category":"page"},{"location":"fock_operators/","page":"Fock Operators","title":"Fock Operators","text":"Fock\nnorm_rot!\nrotate_first_lobe!\nenergy_matrix!\nhamiltonian\nupdate!","category":"page"},{"location":"fock_operators/#SCF.Fock","page":"Fock Operators","title":"SCF.Fock","text":"Fock(quantum_system, equations, S, symmetries)\n\nA Fock operator consists of a quantum_system, from which equations are variationally derived, via an overload of diff(quantum_system). quantum_system must also provide an overload for overlap_matrix -> S.\n\nequations must provide an overload for energy_matrix!. equations must be iterable, where each element corresponds to the equation for one orbital, and must provide an overload for hamiltonian and energy. Additionally, update! must be provided for equations, to prepare the equation system for the next iteration.\n\n\n\n\n\n","category":"type"},{"location":"fock_operators/#SCF.norm_rot!","page":"Fock Operators","title":"SCF.norm_rot!","text":"norm_rot!(fock, v)\n\nNormalize and rotate the eigenvector v such that the first lobe has positive sign.\n\n\n\n\n\n","category":"function"},{"location":"fock_operators/#SCF.rotate_first_lobe!","page":"Fock Operators","title":"SCF.rotate_first_lobe!","text":"rotate_first_lobe!(v)\n\nRotate the vector v such that the first lobe has positive sign.\n\n\n\n\n\n","category":"function"},{"location":"fock_operators/#SCF.energy_matrix!","page":"Fock Operators","title":"SCF.energy_matrix!","text":"energy_matrix!(H::AbstractMatrix, equations[, which=:total_energy])\n\nCalculates the energy matrix of the system of equations. This overwrites the entries of H. To be overloaded by the user; must support `which=:totalenergy,which=:doublecountedenergy, andwhich=:kineticenergy`.\n\n\n\n\n\nenergy_matrix!(H::AbstractMatrix, fock::Fock[, which=:total_energy])\n\nCalculates the energy matrix of the quantum system of fock. This overwrites the entries of H.\n\n\n\n\n\n","category":"function"},{"location":"fock_operators/#SCF.hamiltonian","page":"Fock Operators","title":"SCF.hamiltonian","text":"hamiltonian(equation::Equation)\n\nReturns the orbital Hamiltonian of equation. To be overloaded by the user.\n\n\n\n\n\n","category":"function"},{"location":"fock_operators/#SCF.update!","page":"Fock Operators","title":"SCF.update!","text":"update!(eqs; kwargs...)\n\nUpdate the equation system eqs, for the current iteration. To be overloaded by the user.\n\n\n\n\n\nupdate!(eqs, quantum_system; kwargs...)\n\nUpdate the equation system eqs with respect to quantum_system, for the current iteration. To be overloaded by the user.\n\n\n\n\n\n","category":"function"},{"location":"self_consistent_iteration/#Self-Consistent-Iteration","page":"Self-Consistent Iteration","title":"Self-Consistent Iteration","text":"","category":"section"},{"location":"self_consistent_iteration/","page":"Self-Consistent Iteration","title":"Self-Consistent Iteration","text":"CurrentModule = SCF","category":"page"},{"location":"self_consistent_iteration/","page":"Self-Consistent Iteration","title":"Self-Consistent Iteration","text":"scf!\nscf_iteration!\nsolve_orbital_equation!\nsolve_secular_problem!","category":"page"},{"location":"self_consistent_iteration/#SCF.scf!","page":"Self-Consistent Iteration","title":"SCF.scf!","text":"scf!([fun!, ]fock[; ω=0, max_iter=200, tol=1e-8, verbosity=1])\n\nPerform the SCF iterations for the fock operator. One iteration is performed by scf_iteration!. The optional fun!(P̃,c̃) argument allows for extra operations to be performed every SCF cycle (such as plotting, etc).\n\nω is a relaxation parameter; the orbitals and mixing coefficients are updated as wᵢ₊₁ = (1-ω)w̃ + ωwᵢ where w̃ is the solution in the current iteration and wᵢ the previous solution. The default (ω=0) is to only use this solution. A larger value of ω makes it easier to achieve convergence in oscillatory problems, but a too large value decreases the convergence rate. It is therefore desireable to reduce the value of ω if the convergence is deemed to be monotonous, the criterion for which is whether the change over the monotonous_window last iterations is steadily decreasing. If this is the case, ω will be reduced by multiplying by ωfactor. Conversely, if the change is non-monotonous, ω will be increased, but not beyond ωmax.\n\nThe SCF procedure continues until either the amount of iterations equals max_iter or the change in the coefficients is below tol.\n\n\n\n\n\n","category":"function"},{"location":"self_consistent_iteration/#SCF.scf_iteration!","page":"Self-Consistent Iteration","title":"SCF.scf_iteration!","text":"scf_iteration!(fock, P, H, c, okws,\n               [; verbosity=0, method=:arnoldi, σ=nothing, tol=1e-10,\n                update_mixing_coefficients=true])\n\nPerform one step of the SCF iteration. This will\n\nImprove each of the orbitals in turn, using the values of the orbitals P and mixing coefficients c from the previous step as input.\nSolve the secular problem to find new values for the mixing coefficients, c, unless update_mixing_coefficients==false.\n\nokws is a vector of OrthogonalKrylovWrappers, one for each orbital.\n\n\n\n\n\n","category":"function"},{"location":"self_consistent_iteration/#SCF.solve_orbital_equation!","page":"Self-Consistent Iteration","title":"SCF.solve_orbital_equation!","text":"solve_orbital_equation!(Pj, okw, method, tol)\n\nSolve the orbital equation for the jth orbital, by solving the eigenproblem of the OrthogonalKrylovWrapper operator okw, and store the result in the radial orbital vector of expansion coefficients Pj. The solution is computed using method; valid choices are\n\n:arnoldi, which uses ArnoldiMethod.jl. Really small grid spacings/large grid extents can be problematic with this method, due to high condition numbers.\n:lobpcg, which uses IterativeSolvers.jl. Too coarse grids can cause never-ending loops or errors from the Cholesky decomposition, complaining about non-positive definite subproblems.\n\nBoth methods are controlled by the stopping tolerance tol.\n\n\n\n\n\n","category":"function"},{"location":"self_consistent_iteration/#SCF.solve_secular_problem!","page":"Self-Consistent Iteration","title":"SCF.solve_secular_problem!","text":"solve_secular_problem!(H, c, fock)\n\nForm the energy matrix, store it in H, and then solve the secular problem Hc = Ec for the lowest eigenvalue.\n\n\n\n\n\n","category":"function"},{"location":"self_consistent_iteration/#KrylovWrapper","page":"Self-Consistent Iteration","title":"KrylovWrapper","text":"","category":"section"},{"location":"self_consistent_iteration/","page":"Self-Consistent Iteration","title":"Self-Consistent Iteration","text":"The orbital improvements are performed via diagonalization of the integro-differential equations for each orbital. The diagonalization procedure is the Arnoldi method, which requires the repeated action of the Hamiltonian on a vector. The KrylovWrapper object is used to wrap Hamiltonians which are not simple <:AbstractMatrix objects, but which require a specialized implementation of mul! to act on a <:AbstractVector of coefficients. An example is the kind of Hamiltonians implemented in the Atoms.jl library, which are based on the function space algebra from ContinuumArrays.jl.","category":"page"},{"location":"self_consistent_iteration/","page":"Self-Consistent Iteration","title":"Self-Consistent Iteration","text":"KrylovWrapper\nBase.size(::KrylovWrapper)\nLinearAlgebra.mul!(y::V₁, A::KrylovWrapper{T,Hamiltonian}, x::V₂) where {V₁,V₂,T,Hamiltonian<:AbstractMatrix}","category":"page"},{"location":"self_consistent_iteration/#SCF.KrylovWrapper","page":"Self-Consistent Iteration","title":"SCF.KrylovWrapper","text":"KrylovWrapper(hamiltonian)\n\nProxy object used in the Krylov iterations, during orbital improvement. This is useful, since hamiltonian may be defined to act on objects such as vectors living in function spaces (as e.g. implemented using ContinuumArrays.jl), whereas the SCF iterations act on the coefficients directly.\n\n\n\n\n\n","category":"type"},{"location":"self_consistent_iteration/#Base.size-Tuple{SCF.KrylovWrapper}","page":"Self-Consistent Iteration","title":"Base.size","text":"size(::KrylovWrapper)\n\nReturns the dimension of the KrylovWrapper. For Hamiltonians which are not <:AbstractMatrix, this needs to be overloaded.\n\n\n\n\n\n","category":"method"},{"location":"self_consistent_iteration/#Gershgorin's-circle-theorem","page":"Self-Consistent Iteration","title":"Gershgorin's circle theorem","text":"","category":"section"},{"location":"self_consistent_iteration/","page":"Self-Consistent Iteration","title":"Self-Consistent Iteration","text":"Gershgorin's circle theorem can be used to estimate the bounds on the eigenspectrum of a matrix. It is always correct, but only a useful estimate when the matrix is diagonally dominant. Furthermore, gershgorin_bounds is limited to the case of Hermitian matrices, whose eigenvalues lie on the real line. If an experimental energy is known, that is almost always a better lower bound to use for the Shift-and-invert strategy.","category":"page"},{"location":"self_consistent_iteration/","page":"Self-Consistent Iteration","title":"Self-Consistent Iteration","text":"gershgorin_disc\ngershgorin_discs\ngershgorin_bounds","category":"page"},{"location":"self_consistent_iteration/#SCF.gershgorin_disc","page":"Self-Consistent Iteration","title":"SCF.gershgorin_disc","text":"gershgorin_disc(i, row)\n\nReturn the Gershgorin disc for the ith row of a matrix.\n\n\n\n\n\n","category":"function"},{"location":"self_consistent_iteration/#SCF.gershgorin_discs","page":"Self-Consistent Iteration","title":"SCF.gershgorin_discs","text":"gershgorin_discs(A)\n\nCompute all Gershgorin discs of a matrix A.\n\n\n\n\n\n","category":"function"},{"location":"self_consistent_iteration/#SCF.gershgorin_bounds","page":"Self-Consistent Iteration","title":"SCF.gershgorin_bounds","text":"gershgorin_bounds(A)\n\nFor a Hermitian matrix A, compute the bounds on the real axis of the eigenspectrum. NB that this bound will only be useful for diagonally dominant As.\n\n\n\n\n\n","category":"function"},{"location":"#SCF.jl","page":"Home","title":"SCF.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"A Julia library for the self-consistent field method, mainly intended to solve problems on the form","category":"page"},{"location":"","page":"Home","title":"Home","text":"beginequation\nE(vecPvecc) = fracvecc^H\nmatHveccvecc^Hvecc\nendequation","category":"page"},{"location":"","page":"Home","title":"Home","text":"where vecP is a set of orbitals, vecc is a vector of mixing coefficients, and","category":"page"},{"location":"","page":"Home","title":"Home","text":"beginequation\nmatH_ij defd matrixelP_iHamiltonianP_j\nendequation","category":"page"},{"location":"","page":"Home","title":"Home","text":"Such equations arise in the multi-configurational (Dirac–)Hartree–Fock approximation, used in theoretical atomic and molecular physics.","category":"page"},{"location":"","page":"Home","title":"Home","text":"This library only implements the SCF procedure. The actual equations that are to be solved have to be setup by the user (for atoms, the Atoms.jl library may be used).","category":"page"},{"location":"#References","page":"Home","title":"References","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Fischer, C. F. (1986). Self-Consistent-Field (SCF) and Multiconfiguration (MC) Hartree-Fock (HF) Methods in Atomic Calculations: Numerical Integration Approaches. Computer Physics Reports, 3(5), 274–325. DOI: 10.1016/0167-7977(86)90001-8","category":"page"}]
}
